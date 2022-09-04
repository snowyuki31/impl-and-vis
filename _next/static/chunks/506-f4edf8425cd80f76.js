"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[506],{6946:function(a,b,c){c.d(b,{q:function(){return M},Z:function(){return N}});var d=c(5893),e=c(7357),f=c(3366),g=c(7462),h=c(7294),i=c(6010),j=c(4780),k=c(917),l=c(1796),m=c(8216),n=c(2734),o=c(948),p=c(1657),q=c(4867),r=c(1588);function s(a){return(0,q.Z)("MuiLinearProgress",a)}(0,r.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);let t=["className","color","value","valueBuffer","variant"],u=a=>a,v,w,x,y,z,A,B=(0,k.F4)(v||(v=u`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),C=(0,k.F4)(w||(w=u`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),D=(0,k.F4)(x||(x=u`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),E=a=>{let{classes:b,variant:c,color:d}=a,e={root:["root",`color${(0,m.Z)(d)}`,c],dashed:["dashed",`dashedColor${(0,m.Z)(d)}`],bar1:["bar",`barColor${(0,m.Z)(d)}`,("indeterminate"===c||"query"===c)&&"bar1Indeterminate","determinate"===c&&"bar1Determinate","buffer"===c&&"bar1Buffer"],bar2:["bar","buffer"!==c&&`barColor${(0,m.Z)(d)}`,"buffer"===c&&`color${(0,m.Z)(d)}`,("indeterminate"===c||"query"===c)&&"bar2Indeterminate","buffer"===c&&"bar2Buffer"]};return(0,j.Z)(e,s,b)},F=(a,b)=>"inherit"===b?"currentColor":a.vars?a.vars.palette.LinearProgress[`${b}Bg`]:"light"===a.palette.mode?(0,l.$n)(a.palette[b].main,.62):(0,l._j)(a.palette[b].main,.5),G=(0,o.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,b)=>{let{ownerState:c}=a;return[b.root,b[`color${(0,m.Z)(c.color)}`],b[c.variant]]}})(({ownerState:a,theme:b})=>(0,g.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:F(b,a.color)},"inherit"===a.color&&"buffer"!==a.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===a.variant&&{backgroundColor:"transparent"},"query"===a.variant&&{transform:"rotate(180deg)"})),H=(0,o.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(a,b)=>{let{ownerState:c}=a;return[b.dashed,b[`dashedColor${(0,m.Z)(c.color)}`]]}})(({ownerState:a,theme:b})=>{let c=F(b,a.color);return(0,g.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===a.color&&{opacity:.3},{backgroundImage:`radial-gradient(${c} 0%, ${c} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,k.iv)(y||(y=u`
    animation: ${0} 3s infinite linear;
  `),D)),I=(0,o.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,b)=>{let{ownerState:c}=a;return[b.bar,b[`barColor${(0,m.Z)(c.color)}`],("indeterminate"===c.variant||"query"===c.variant)&&b.bar1Indeterminate,"determinate"===c.variant&&b.bar1Determinate,"buffer"===c.variant&&b.bar1Buffer]}})(({ownerState:a,theme:b})=>(0,g.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===a.color?"currentColor":(b.vars||b).palette[a.color].main},"determinate"===a.variant&&{transition:"transform .4s linear"},"buffer"===a.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:a})=>("indeterminate"===a.variant||"query"===a.variant)&&(0,k.iv)(z||(z=u`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),B)),J=(0,o.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,b)=>{let{ownerState:c}=a;return[b.bar,b[`barColor${(0,m.Z)(c.color)}`],("indeterminate"===c.variant||"query"===c.variant)&&b.bar2Indeterminate,"buffer"===c.variant&&b.bar2Buffer]}})(({ownerState:a,theme:b})=>(0,g.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==a.variant&&{backgroundColor:"inherit"===a.color?"currentColor":(b.vars||b).palette[a.color].main},"inherit"===a.color&&{opacity:.3},"buffer"===a.variant&&{backgroundColor:F(b,a.color),transition:"transform .4s linear"}),({ownerState:a})=>("indeterminate"===a.variant||"query"===a.variant)&&(0,k.iv)(A||(A=u`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),C)),K=h.forwardRef(function(a,b){let c=(0,p.Z)({props:a,name:"MuiLinearProgress"}),{className:e,color:h="primary",value:j,valueBuffer:k,variant:l="indeterminate"}=c,m=(0,f.Z)(c,t),o=(0,g.Z)({},c,{color:h,variant:l}),q=E(o),r=(0,n.Z)(),s={},u={bar1:{},bar2:{}};if(("determinate"===l||"buffer"===l)&& void 0!==j){s["aria-valuenow"]=Math.round(j),s["aria-valuemin"]=0,s["aria-valuemax"]=100;let v=j-100;"rtl"===r.direction&&(v=-v),u.bar1.transform=`translateX(${v}%)`}if("buffer"===l&& void 0!==k){let w=(k||0)-100;"rtl"===r.direction&&(w=-w),u.bar2.transform=`translateX(${w}%)`}return(0,d.jsxs)(G,(0,g.Z)({className:(0,i.Z)(q.root,e),ownerState:o,role:"progressbar"},s,{ref:b},m,{children:["buffer"===l?(0,d.jsx)(H,{className:q.dashed,ownerState:o}):null,(0,d.jsx)(I,{className:q.bar1,ownerState:o,style:u.bar1}),"determinate"===l?null:(0,d.jsx)(J,{className:q.bar2,ownerState:o,style:u.bar2})]}))});var L=K,M=function(a){var b=a.hooks,c=a.field,f=b.useInfo[0].progress;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.Z,{sx:{height:{xs:"60vw",sm:"50vw",md:"40vw",lg:"400px"},width:{xs:"60vw",sm:"50vw",md:"40vw",lg:"400px"}},children:c}),(0,d.jsx)(L,{variant:"determinate",color:"inherit",value:f})]})},N=M},1734:function(a,b,c){var d=c(1799),e=c(9396),f=c(828),g=c(5893),h=c(2280),i=c(8895),j=c(3508),k=c(2797),l=c(3454),m=c(5468),n=c(6447),o=c(6420),p=function(a,b,c){var p=(0,f.Z)(a.useGenerator,2),q=p[0],r=p[1],s=(0,f.Z)(a.useSolver,2),t=s[0],u=s[1],v=(0,f.Z)(a.useInfo,2),w=(v[0],v[1]),x=[];return Object.entries(c).forEach(function(a){var b=(0,f.Z)(a,2),c=b[0],d=b[1];x.push((0,g.jsx)(o.Z,{value:d,children:c},c))}),(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(h.Z,{sx:{m:1,bgcolor:"inherit"},children:[(0,g.jsx)(i.Z,{expandIcon:(0,g.jsx)(j.Z,{}),children:(0,g.jsx)(m.Z,{type:"number",label:"seed",variant:"standard",size:"small",value:q.seed,onChange:function(a){r((0,e.Z)((0,d.Z)({},q),{seed:Number(a.target.value)})),u((0,e.Z)((0,d.Z)({},t),{solver:null})),w(b)}})}),(0,g.jsx)(k.Z,{children:(0,g.jsx)(n.Z,{direction:"column",children:(0,g.jsx)(l.Z,{color:"primary",exclusive:!0,value:q.size,onChange:function(a,c){null!==c&&(r((0,e.Z)((0,d.Z)({},q),{size:c})),u((0,e.Z)((0,d.Z)({},t),{solver:null})),w(b))},size:"small",orientation:"vertical",children:x})})})]})})};b.Z=p},3443:function(a,b,c){var d=c(5893),e=function(a){var b=a.hooks,c=a.inputInfo,e=a.outputInfo,f=a.legend,g=a.isWarning,h=b.useInfo[0],i=g&&(0,d.jsx)("div",{style:{color:"#C84B31"},children:"Calculation may take a while"}),j=h.calculationTime<.1?"0.00":h.calculationTime.toFixed(2),k=(0,d.jsxs)("div",{children:["Calculation completed in ",j," ms"]});return(0,d.jsxs)(d.Fragment,{children:[f,c,null!==h.calculationTime&&k,e,i]})};b.Z=e},2532:function(a,b,c){var d=c(1799),e=c(9396),f=c(828),g=c(5893),h=c(6420),i=c(3454),j=function(a,b,c,j,k){var l=(0,f.Z)(a.useSolver,2),m=l[0],n=l[1],o=(0,f.Z)(a.useInfo,2),p=(o[0],o[1]),q=[];return Object.entries(c).forEach(function(a){var b=(0,f.Z)(a,2),c=b[0],d=b[1];q.push((0,g.jsx)(h.Z,{value:d,disabled:j&&j[d],children:d},c))}),(0,g.jsx)(i.Z,{color:"primary",value:m.solver,exclusive:!0,onChange:function(a,c){null!==c&&(n((0,e.Z)((0,d.Z)({},m),{solver:c})),p(b))},size:"medium",orientation:k,children:q})};b.Z=j},93:function(a,b,c){var d=c(5893),e=c(6092),f=c(7357),g=c(3156),h=c(6886);c(7294);var i=function(a){var b=a.pagename,c=(a.description,a.field),f=a.infoArea,i=a.generator,m=a.solver;return(0,d.jsxs)(e.Z,{pagename:b,children:[(0,d.jsx)("h1",{children:b}),(0,d.jsx)(j,{field:c,infoArea:f}),(0,d.jsx)(g.Z,{children:(0,d.jsxs)(h.ZP,{container:!0,justifyContent:"center",columnSpacing:1,children:[(0,d.jsx)(h.ZP,{xs:8,sm:4,item:!0,children:(0,d.jsx)(k,{children:i})}),(0,d.jsx)(h.ZP,{xs:8,sm:4,item:!0,children:(0,d.jsx)(l,{children:m})})]})})]})};b.Z=i;var j=function(a){var b=a.field,c=a.infoArea;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f.Z,{sx:{height:{xs:"60vw",sm:"50vw",md:"40vw",lg:"400px"}},children:b}),(0,d.jsx)(f.Z,{sx:{pt:1,width:{xs:"90vw",sm:"80vw",md:"50vw",lg:"600px"}},style:{textAlign:"center"},children:c})]})},k=function(a){var b=a.children;return(0,d.jsxs)(f.Z,{sx:{bgcolor:"inherit"},children:[(0,d.jsx)("h3",{style:{textAlign:"center"},children:"Generator"}),b]})},l=function(a){var b=a.children;return(0,d.jsxs)(f.Z,{children:[(0,d.jsx)("h3",{style:{textAlign:"center"},children:"Solver"}),(0,d.jsx)(f.Z,{style:{textAlign:"center"},children:b})]})}},6343:function(a,b,c){var d=c(7294),e=function(a,b){var c=(0,d.useRef)(a);(0,d.useEffect)(function(){c.current=a},[a]),(0,d.useEffect)(function(){var a=setInterval(function(){c.current()},b);return function(){clearInterval(a)}})};b.Z=e}}])