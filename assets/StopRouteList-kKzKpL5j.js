import{r as f,a9 as w,a6 as H,aF as P,a5 as V,al as B,j as C,aa as G,a0 as J}from"./index-gBaZHYPD.js";import{S as Q}from"./App-DpcRoPt9.js";import{C as U}from"./CircularProgress-DnvSrbIM.js";const W=({stopKeys:h,disabled:g=!1})=>{const{db:{routeList:a,stopList:d,serviceDayMap:p,holidays:T},isTodayHoliday:x}=f.useContext(w),{isVisible:O,refreshInterval:M,isRouteFilter:b}=f.useContext(H),k=f.useMemo(()=>h.reduce((e,[u])=>e||u==="lightRail",!1),[h]),j=f.useMemo(()=>Object.entries(a).reduce((e,[u,{stops:o,freq:t}])=>(b&&!P(u,t,x,p)||h.forEach(([i,s])=>{var r;(r=o[i])==null||r.forEach((n,l)=>{n===s&&e.push([u,l])})}),e),[]).map(e=>e.join("|")).filter((e,u,o)=>o.indexOf(e)===u).map(e=>e.split("|")),[h,a,b,x,p]),[A,q]=f.useState([]),y=V(),I=f.useRef(!1),L=f.useCallback(()=>!O||g||navigator.userAgent==="prerendering"?(q([]),new Promise(e=>e([]))):Promise.all(j.map(([e,u])=>B({...a[e],seq:parseInt(u,10),stopList:d,language:y,holidays:T,serviceDayMap:p}))).then(e=>{if(I.current){const u=[];q(e.map((o,t)=>[j[t].join("/"),o.filter(({co:i,dest:s})=>i!=="mtr"?!0:a[j[t][0]].stops[i].map(r=>{var n;return(n=d[r])==null?void 0:n.name.zh}).includes(s.zh))]).reduce((o,[t,i])=>{if(i.length==0)o.push([t,i]);else{const s=u.find(r=>{try{const n=r[1].map(E=>E.eta).join("|"),l=i.map(E=>E.eta).join("|"),m=r[0][0].split("/")[0],S=t.split("/")[0],R=a[m].route,z=a[S].route,c=a[m].co,v=i[0].co;return n===l&&c.includes(v)&&R===z}catch{return!1}});s!==void 0?s[0].push(t):u.push([[t],i])}return o},[]).concat(u.map(([o,t])=>{if(o.length==1)return[o[0],t];{const i=o.map(r=>{var v,E,D,N;const[n]=r.split("/"),l=((v=a[n])==null?void 0:v.freq)??null,m=((E=a[n])==null?void 0:E.fares)??null,S=Number(((D=a[n])==null?void 0:D.serviceType)??"16"),R=Object.entries((N=a[n])==null?void 0:N.bound).map(([,F])=>F),z=P(n,l,x,p);let c=0;return c+=z?0:256,c+=l!==null?0:128,c+=m!==null?0:128,c+=R.includes("IO")||R.includes("OI")?0:32,c+=S,[r,c]}),[s]=i.reduce(([r,n],[l,m])=>(m<n&&(r=l,n=m),[r,n]),["",999999]);return[s,t]}})).sort(([o,t],[i,s])=>(t=t.filter(r=>r.eta),s=s.filter(r=>r.eta),t.length===0&&s.length===0?o<i?-1:1:t.length===0?1:s.length===0?-1:k?t[0].remark.zh===s[0].remark.zh?t[0].eta<s[0].eta?-1:1:t[0].remark.zh<s[0].remark.zh?-1:1:t[0].eta===s[0].eta?o<i?-1:1:t[0].eta<s[0].eta?-1:1)))}}),[O,g,y,a,d,j,k,T,x,p]);return f.useEffect(()=>{I.current=!0;const e=setInterval(()=>{L()},M);return L(),()=>{I.current=!1,clearInterval(e)}},[L,M]),A},_=({stops:h,isFocus:g})=>{const a=W({stopKeys:h,disabled:!g});return a.length===0?C.jsx(G,{sx:X,children:C.jsx(U,{sx:{my:5}})}):C.jsx(J,{children:a.map(([d,p])=>C.jsx(Q,{routeId:d,etas:p},d))})},X={display:"flex",flex:1,justifyContent:"center"};export{_ as S};
