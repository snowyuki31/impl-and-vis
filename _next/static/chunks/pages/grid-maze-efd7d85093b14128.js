(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[218],{8976:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/grid-maze",function(){return c(5294)}])},93:function(a,b,c){"use strict";var d=c(5893),e=c(6092),f=c(7357),g=c(3156),h=c(6886);c(7294);var i=function(a){var b=a.pagename,c=(a.description,a.field),f=a.infoArea,i=a.generator,m=a.solver;return(0,d.jsxs)(e.Z,{pagename:b,children:[(0,d.jsx)("h1",{children:b}),(0,d.jsx)(j,{field:c,infoArea:f}),(0,d.jsx)(g.Z,{children:(0,d.jsxs)(h.ZP,{container:!0,justifyContent:"center",columnSpacing:1,children:[(0,d.jsx)(h.ZP,{xs:8,sm:4,item:!0,children:(0,d.jsx)(k,{children:i})}),(0,d.jsx)(h.ZP,{xs:8,sm:4,item:!0,children:(0,d.jsx)(l,{children:m})})]})})]})};b.Z=i;var j=function(a){var b=a.field,c=a.infoArea;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f.Z,{sx:{width:{xs:"60vw",sm:"50vw",md:"40vw",lg:"400px"}},children:b}),(0,d.jsx)(f.Z,{sx:{pt:1,width:{xs:"90vw",sm:"80vw",md:"50vw",lg:"600px"}},style:{textAlign:"center"},children:c})]})},k=function(a){var b=a.children;return(0,d.jsxs)(f.Z,{sx:{bgcolor:"inherit"},children:[(0,d.jsx)("h3",{style:{textAlign:"center"},children:"Generator"}),b]})},l=function(a){var b=a.children;return(0,d.jsxs)(f.Z,{children:[(0,d.jsx)("h3",{style:{textAlign:"center"},children:"Solver"}),(0,d.jsx)(f.Z,{style:{textAlign:"center"},children:b})]})}},5294:function(a,b,c){"use strict";c.r(b),c.d(b,{Field:function(){return H},Generator:function(){return J},InfoArea:function(){return I},Solver:function(){return K},default:function(){return G}});var d=c(1799),e=c(9396),f=c(828),g=c(5893),h=c(7294),i=c(93),j=c(943),k=c(3375),l=c(1566);function m(a){return function(a){if(Array.isArray(a))return(0,j.Z)(a)}(a)||(0,k.Z)(a)||(0,l.Z)(a)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var n=c(922),o=c.n(n),p=function(a){var b="".concat(o().cell);a.states.forEach(function(a){b+=" ".concat(o()[a])});var c={width:a.width<0?"10px":"calc(100% / "+a.width+")",height:a.width<0?"10px":""};return(0,g.jsx)("div",{className:b,style:c})},q=p,r=c(6855),s=c(8617),t=c.n(s),u=c(7357),v=c(6447),w=c(6343);function x(a){for(var b=[],c=a.width(),d=0;d<c;d++)for(var e=0;e<c;e++){var f=[],h=a.get(d,e);h===r.r8.Close?f.push("close"):h==r.r8.Start?f.push("start"):h==r.r8.Goal?f.push("goal"):f.push("open"),-1!=a.get_value(d,e)&&h==r.r8.Open&&f.push("visited"),b.push((0,g.jsx)(q,{states:f,value:d*c+e,width:c}))}return b}var y=function(a){var b=a.problemProps,c=(0,f.Z)(b.useGenerator,2),i=c[0];c[1];var j=(0,f.Z)(b.useSolver,2),k=j[0];j[1];var l=(0,f.Z)(b.useInfo,2),n=l[0],o=l[1],p=(0,h.useState)(),s=p[0],y=p[1],z=(0,h.useState)(),A=z[0],B=z[1],C=(0,h.useState)(),D=C[0],E=C[1],F=(0,h.useState)(),G=F[0],H=F[1],I=(0,h.useState)(0),J=I[0],K=I[1];return(0,h.useEffect)(function(){H(null),E(null),K(0),(0,r.ZP)().then(function(){var a=r.rj.new(i.size,i.size,i.seed);a.build(),y(a),B(x(a))})},[i.seed,i.size]),(0,h.useEffect)(function(){if(K(0),s){s.initialize_values(),B(x(s));var a=null;"bfs"===k.solver?a=s.bfs():"dfs"===k.solver?a=s.dfs():"astar"===k.solver&&(a=s.astar()),null!==a&&(o((0,e.Z)((0,d.Z)({},n),{visited:1})),E(a),H(s.trace_back()))}},[k.solver]),(0,w.Z)(function(){if(s&&D&&A&&G){if(J<D.length){var a=m(A);a[D[J]]=(0,g.jsx)(q,{states:["open","visited"],value:D[J],width:s.width()}),B(a),K(J+1),o((0,e.Z)((0,d.Z)({},n),{visited:n.visited+1}))}else if(J>=D.length&&J<D.length+G.length){var a=m(A);a[G[J-D.length]]=(0,g.jsx)(q,{states:["open","on_path"],value:D[J],width:s.width()}),B(a),K(J+1),o((0,e.Z)((0,d.Z)({},n),{length:2+J-D.length}))}}},525/i.size),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(u.Z,{sx:{height:{xs:"60vw",sm:"50vw",md:"40vw",lg:"400px"}},className:t().maze,children:A}),(0,g.jsxs)(v.Z,{direction:"row",justifyContent:"center",spacing:5,sx:{mt:1},children:[(0,g.jsxs)(v.Z,{direction:"row",justifyContent:"center",children:[(0,g.jsx)(q,{states:["start"],value:-1,width:-1}),"Start"]}),(0,g.jsxs)(v.Z,{direction:"row",justifyContent:"center",children:[(0,g.jsx)(q,{states:["goal"],value:-1,width:-1}),"Goal"]})]})]})},z=c(6420),A=c(3454),B=c(5468),C=c(2280),D=c(8895),E=c(3508),F=c(2797),G=function(){var a={useGenerator:(0,h.useState)({seed:Math.floor(100*Math.random()),size:35}),useSolver:(0,h.useState)({solver:"None"}),useInfo:(0,h.useState)({length:-1,visited:-1})};return(0,g.jsx)(i.Z,{pagename:"Grid Maze",field:H(a),infoArea:I(a),generator:J(a),solver:K(a)})},H=function(a){return(0,g.jsx)(y,{problemProps:a})},I=function(a){var b=(0,f.Z)(a.useInfo,2),c=b[0];return b[1],(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{children:["Path Length: ",-1!=c.length?c.length:"-"]}),(0,g.jsxs)("div",{children:["Visited Cells: ",-1!=c.visited?c.visited:"-"]})]})},J=function(a){var b=(0,f.Z)(a.useGenerator,2),c=b[0],h=b[1],i=(0,f.Z)(a.useSolver,2),j=i[0],k=i[1],l=(0,f.Z)(a.useInfo,2),m=l[0],n=l[1];return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(C.Z,{sx:{m:1,bgcolor:"inherit"},children:[(0,g.jsx)(D.Z,{expandIcon:(0,g.jsx)(E.Z,{}),children:(0,g.jsx)(B.Z,{type:"number",label:"seed",variant:"standard",size:"small",value:c.seed,onChange:function(a){h((0,e.Z)((0,d.Z)({},c),{seed:Number(a.target.value)})),k((0,e.Z)((0,d.Z)({},j),{solver:"None"})),n((0,e.Z)((0,d.Z)({},m),{length:-1,visited:-1}))}})}),(0,g.jsx)(F.Z,{children:(0,g.jsx)(v.Z,{direction:"column",children:(0,g.jsxs)(A.Z,{color:"primary",value:c.size,exclusive:!0,onChange:function(a,b){null!==b&&(h((0,e.Z)((0,d.Z)({},c),{size:b})),k((0,e.Z)((0,d.Z)({},j),{solver:"None"})),n((0,e.Z)((0,d.Z)({},m),{length:-1,visited:-1})))},size:"small",children:[(0,g.jsx)(z.Z,{value:21,children:"Small"}),(0,g.jsx)(z.Z,{value:35,children:"Medium"}),(0,g.jsx)(z.Z,{value:61,children:"Large"})]})})})]})})},K=function(a){var b=(0,f.Z)(a.useSolver,2),c=b[0],h=b[1],i=(0,f.Z)(a.useInfo,2),j=i[0],k=i[1];return(0,g.jsxs)(A.Z,{color:"primary",value:c.solver,exclusive:!0,onChange:function(a,b){null!==b&&(h((0,e.Z)((0,d.Z)({},c),{solver:b})),k((0,e.Z)((0,d.Z)({},j),{length:-1,visited:-1})))},size:"medium",children:[(0,g.jsx)(z.Z,{value:"bfs",children:"BFS"}),(0,g.jsx)(z.Z,{value:"dfs",children:"DFS"}),(0,g.jsx)(z.Z,{value:"astar",children:"A*"})]})}},6343:function(a,b,c){"use strict";var d=c(7294),e=function(a,b){var c=(0,d.useRef)(a);(0,d.useEffect)(function(){c.current=a},[a]),(0,d.useEffect)(function(){var a=setInterval(function(){c.current()},b);return function(){clearInterval(a)}})};b.Z=e},922:function(a){a.exports={cell:"style_cell__zjXtD",open:"style_open__arZ5Z",close:"style_close__0G5pi",start:"style_start__xuIj9",goal:"style_goal__4P6tO",visited:"style_visited__cZver",on_path:"style_on_path__WpXi8"}},8617:function(a){a.exports={maze:"style_maze__qmS0w"}}},function(a){a.O(0,[775,886,185,682,774,888,179],function(){var b;return a(a.s=8976)}),_N_E=a.O()}])