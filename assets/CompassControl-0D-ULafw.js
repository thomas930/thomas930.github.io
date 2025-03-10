import{t as d,j as s,r as n,a6 as p,aY as u,aa as f}from"./index-gBaZHYPD.js";import{C as g,L as h,a as v}from"./BaseTile-BAYXgXHE.js";import{t as x}from"./index-DbjCqo02.js";const C=d(s.jsx("path",{d:"M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m2.19 12.19L6 18l3.81-8.19L18 6z"}),"Explore"),y=(o=20)=>{const r=n.useRef(!1),[a,t]=n.useState(null),i=n.useMemo(()=>x(e=>{t(e)},Math.max(5,o)),[]);return n.useEffect(()=>{const e=c=>{c.absolute&&(r.current=!0),typeof c.webkitCompassHeading<"u"?i({degree:360-c.webkitCompassHeading,accuracy:c.webkitCompassAccuracy}):c.absolute===r.current&&i(c.alpha!==null?{degree:c.alpha,accuracy:0}:null)};return window.addEventListener("deviceorientationabsolute",e),window.addEventListener("deviceorientation",e),()=>{window.removeEventListener("deviceorientationabsolute",e),window.removeEventListener("deviceorientation",e)}},[]),a},A=()=>{const o=Promise.resolve("granted");return m&&typeof DeviceOrientationEvent<"u"&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"?DeviceOrientationEvent.requestPermission():o},m=(()=>{try{return!!(navigator&&navigator.userAgent&&navigator.userAgent.includes("Safari/")&&!(navigator.userAgent.includes("Chrome/")||navigator.userAgent.includes("Chromium/")))}catch{return!1}})();(function(){var o=L.Marker.prototype._initIcon,r=L.Marker.prototype._setPos,a=L.DomUtil.TRANSFORM==="msTransform";L.Marker.addInitHook(function(){var t=this.options.icon&&this.options.icon.options,i=t&&this.options.icon.options.iconAnchor;i&&(i=i[0]+"px "+i[1]+"px"),this.options.rotationOrigin=this.options.rotationOrigin||i||"center bottom",this.options.rotationAngle=this.options.rotationAngle||0,this.on("drag",function(e){e.target._applyRotation()})}),L.Marker.include({_initIcon:function(){o.call(this)},_setPos:function(t){r.call(this,t),this._applyRotation()},_applyRotation:function(){this.options.rotationAngle&&(this._icon.style[L.DomUtil.TRANSFORM+"Origin"]=this.options.rotationOrigin,a?this._icon.style[L.DomUtil.TRANSFORM]="rotate("+this.options.rotationAngle+"deg)":this._icon.style[L.DomUtil.TRANSFORM]+=" rotateZ("+this.options.rotationAngle+"deg)")},setRotationAngle:function(t){return this.options.rotationAngle=t,this.update(),this},setRotationOrigin:function(t){return this.options.rotationOrigin=t,this.update(),this}})})();const E=o=>{const r=n.useRef(null),a=y(100),[t,i]=n.useState(null);return n.useEffect(()=>{const e=c=>{try{const l=JSON.parse(c.data);(l==null?void 0:l.type)==="compass"&&i({degree:l.degree,accuracy:l.accuracy})}catch(l){console.error(l)}};return window.addEventListener("message",e),()=>{window.removeEventListener("message",e)}},[]),n.useEffect(()=>{i(a)},[a]),n.useEffect(()=>{const e=r.current;e&&t&&(e.setRotationAngle(360-t.degree),e.setRotationOrigin("center"))},[t]),t===null?s.jsx(s.Fragment,{}):s.jsx(v,{ref:r,...o})},M=()=>{const{geolocation:o,geoPermission:r}=n.useContext(p),a=n.useMemo(()=>R(),[]),[t,i]=n.useState(u(o.current));return n.useEffect(()=>{const e=setInterval(()=>{i(u(o.current))},100);return()=>{clearInterval(e)}},[o]),r!=="granted"?null:s.jsxs(s.Fragment,{children:[s.jsx(g,{center:t,radius:25}),s.jsx(E,{rotationOrigin:"center",icon:a,position:t},"rotated-marker")]})},R=()=>h.divIcon({iconSize:[20,20],iconAnchor:[10,10],className:"self-center"}),b=()=>{const{compassPermission:o,setCompassPermission:r}=n.useContext(p),a=n.useCallback(()=>{A().then(t=>{r(t)})},[r]);return!m||o==="granted"?s.jsx(s.Fragment,{}):s.jsx("div",{className:"leaflet-bottom leaflet-right",children:s.jsx(f,{sx:k,className:"leaflet-control leaflet-bar",onClick:a,children:s.jsx(C,{sx:{p:"3px",color:"black"}})})})},k={background:"white",width:32,height:32,marginBottom:"57px !important",marginRight:"5px !important",display:"flex",justifyContent:"center",alignItems:"center"};export{b as C,M as S};
