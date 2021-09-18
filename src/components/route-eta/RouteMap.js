import { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, Polyline, Circle, useMap } from 'react-leaflet'
import Leaflet from 'leaflet'
import markerIcon2X from 'leaflet/dist/images/marker-icon-2x.png'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import AppContext from '../../AppContext'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { checkPosition } from '../../utils'

const ChangeMapCenter = ( {center} ) => {
  const map = useMap()
  if ( navigator.userAgent === 'prerendering' ) {
    map.setView(checkPosition(center), 11)
  } else {
    map.flyTo(checkPosition(center))
  }
  return <></>
}

const SelfCircle = () => {
  const { geolocation, geoPermission } = useContext ( AppContext )
  if ( geoPermission !== 'granted' ) {
    return null
  }
  return (
    <Circle 
      center={checkPosition(geolocation)}
      radius={25}
    />
  )
}

const CenterControl = ( {onClick}) => {
  useStyles()
  return (
    <div className='leaflet-bottom leaflet-right'>
      <div 
        className={`${"routeMap-centerControlContainer"} leaflet-control leaflet-bar`}
        onClick={onClick}
      >
        <MyLocationIcon className={"routeMap-centerControl"} />
      </div>
    </div>
  )
}

const RouteMap = ({stops, stopIdx, onMarkerClick}) => {
  const { db: {stopList}, geolocation, geoPermission, updateGeoPermission } = useContext ( AppContext )
  const classes = useStyles()
  const [mapState, setMapState] = useState({
    center: stopList[stops[stopIdx]] ? stopList[stops[stopIdx]].location : stopList[stops[Math.round(stops.length/2)]].location,
    isFollow: false
  })
  const {center, isFollow} = mapState
  const { i18n } = useTranslation()
  const [map, setMap] = useState(null)

  const updateCenter = ({center, isFollow = false}) => {
    setMapState({
      center: center ? center : map.getCenter(),
      isFollow: isFollow
    })
  }

  useEffect ( () => {
    const _center = stopList[stops[stopIdx]] ? stopList[stops[stopIdx]].location : 
      stopList[stops[Math.round(stops.length/2)]].location
    if ( _center.lat !== center.lat || _center.lng !== center.lng ) {
      updateCenter({ center: _center })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops, stopIdx])

  useEffect ( () => {
    if ( !map ) return;
    map.on('dragend', updateCenter)
    return () => {
      map.off('dragend', updateCenter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  useEffect( () => {
    if ( isFollow ) {
      if ( geolocation.lat !== center.lat || geolocation.lng !== center.lng )
        updateCenter({center: geolocation, isFollow: true})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation])

  return (
    <Box className={"routeMap-mapContainer"}>
      <MapContainer 
        center={checkPosition(center)} 
        zoom={16} 
        scrollWheelZoom={false} 
        className={"routeMap-mapContainer"}
        whenCreated={setMap}
      >
        <ChangeMapCenter center={checkPosition(center)} />
        <TileLayer
          className={classes.tileLayer}
          crossOrigin="anonymous"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
        />
        {
          // plot stops
          stops.map((stopId, idx) => 
              <Marker 
                key={`${stopId}-${idx}`} 
                position={stopList[stopId].location} 
                icon={BusStopMarker({active: idx === stopIdx, passed: (idx < stopIdx)})}
                alt={`${idx}. ${stopList[stopId].name[i18n.language]}`}
                eventHandlers={{
                  click: (e) => {onMarkerClick(idx)(e, true, true)}
                }}
              />
          )
        }
        {
          // plot line
          stops.slice(1).map((stopId, idx) => 
            <Polyline 
              key={`${stopId}-line`}
              positions={[
                getPoint(stopList[stops[idx]].location),
                getPoint(stopList[stopId].location)
              ]}
              color={'#FF9090'}
            />
          )
        }
        <SelfCircle />
        <CenterControl 
          onClick={() => {
            if (geoPermission === 'granted') {
              // load from cache to avoid unintentional re-rending 
              // becoz geolocation is updated frequently 
              updateCenter({center: checkPosition(geolocation), isFollow: true})
            } else if ( geoPermission !== 'denied' ) {
              // ask for loading geolocation
              updateCenter({isFollow: true})
              updateGeoPermission('opening')
            }
          }}
        />
      </MapContainer>
    </Box>
  )
}

export default RouteMap

const getPoint = ({lat, lng}) => [lat, lng]

const BusStopMarker = ( {active, passed} ) => {
  return Leaflet.icon({
    iconUrl: markerIcon2X,
    className: `${"routeMap-marker"} ${active ? "routeMap-active" : ''} ${passed ? "routeMap-passed" : ''}`
  })
}

const useStyles = makeStyles ( theme => ({
  "tileLayer": {
    filter: `${theme.palette.type === "dark" ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none'}`
  },
  "@global": {
    ".routeMap-mapContainer": {
      height: '30vh',
      filter: theme.palette.type === 'dark' ? 'brightness(0.9)' : 'none'
    },
    ".routeMap-centerControl": {
      padding: '5px',
      color: 'black'
    },
    ".routeMap-centerControlContainer": {
      background: 'white',
      height: '28px',
      marginBottom: '20px !important',
      marginRight: '5px !important'
    },
    ".routeMap-marker": {
      marginLeft: '-12px',
      marginTop: '-41px',
      width: '25px',
      height: '41px',
      zIndex: 618,
      outline: 'none',
      filter: 'hue-rotate(130deg)'
    },
    ".routeMap-active": {
      animation: '$blinker 2s linear infinite'
    },
    ".routeMap-passed": {
      filter: 'grayscale(100%)'
    },
    "@keyframes blinker": {
      '50%': {
        opacity: 0.3
      }
    }
  },
}) )
