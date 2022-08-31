(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[439],{8642:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/traveling-salesman",function(){return c(6142)}])},6142:function(a,b,c){"use strict";c.r(b),c.d(b,{Field:function(){return C},Generator:function(){return E},InfoArea:function(){return D},Solver:function(){return F},default:function(){return B}});var d=c(828),e=c(5893),f=c(7294),g=c(93),h=c(1799),i=c(9396),j=c(3109),k=c(6343),l={BF:"Brute Force",DP:"Held-Karp",NN:"Nearest Neighbor",TwoOpt:"NN + 2-opt"},m={Small:10,Medium:17,Large:100,Extreme:500},n={Width:2e3,CircleColor:"rgba(255, 255, 255, 0.4)",LineColor:"#C84B31"},o={progress:0,minCost:"inf",optimal:null,status:null},p=c(6895),q=c.n(p),r=function(a){var b=a.bgCanvasRef,c=a.resultCanvasRef,d=a.size;return(0,e.jsxs)("div",{className:q().canvas_wrap,children:[(0,e.jsx)("canvas",{ref:b,width:d,height:d,className:q().canvas}),(0,e.jsx)("canvas",{ref:c,width:d,height:d,className:q().canvas})]})},s=r;function t(a){var b=a%n.Width;return[(a-b)/n.Width,b]}var u=function(a,b,c){(0,f.useEffect)(function(){var d=a.current,e=b.current;d&&e&&c({bgContext:d.getContext("2d"),resultContext:e.getContext("2d")})},[])},v=function(a,b,c){(0,f.useEffect)(function(){null!==a&&null!==a.bgContext&&c&&(console.log("len:",c.get_nodes().length),a.bgContext.clearRect(0,0,n.Width,n.Width),c.get_nodes().forEach(function(c){var e=(0,d.Z)(t(c),2),f=e[0],g=e[1];null!==a.bgContext&&(a.bgContext.strokeStyle=n.CircleColor,b.size<=300?(a.bgContext.lineWidth=12,a.bgContext.beginPath(),a.bgContext.arc(f,g,40,0,360,!1)):(a.bgContext.lineWidth=7,a.bgContext.beginPath(),a.bgContext.arc(f,g,25,0,360,!1)),a.bgContext.stroke())}),a.bgContext.save())},[c])},w=function(a){var b=a.hooks,c=(0,d.Z)(b.useGenerator,2),g=c[0];c[1];var m=(0,d.Z)(b.useSolver,2),o=m[0];m[1];var p=(0,d.Z)(b.useInfo,2),q=p[0],r=p[1],w=(0,f.useState)(),x=w[0],y=w[1],z=(0,f.useState)(),A=z[0],B=z[1],C=(0,f.useState)(),D=C[0],E=C[1],F=(0,f.useState)(0),G=F[0],H=F[1],I=(0,f.useState)({bgContext:null,resultContext:null}),J=I[0],K=I[1],L=(0,f.useRef)(null),M=(0,f.useRef)(null);return u(L,M,K),(0,f.useEffect)(function(){var a;B(null),E(null),H(0),null===(a=J.resultContext)|| void 0===a||a.clearRect(0,0,n.Width,n.Width),(0,j.ZP)().then(function(){var a=j.kJ.new(g.size,g.seed,n.Width);a.build(),y(a)})},[g,o]),v(J,g,x),(0,f.useEffect)(function(){if(x&&null!==o.solver){var a,b=performance.now();switch(o.solver){case l.BF:a=x.solve_bf();break;case l.DP:a=x.solve_dp();break;case l.NN:a=x.solve_nn();break;case l.TwoOpt:a=x.two_opt()}B(a),E(x.get_costs());var c=performance.now();r((0,i.Z)((0,h.Z)({},q),{status:"Calculation completed in "+(c-b).toFixed(2)+" ms"}))}},[o]),(0,k.Z)(function(){if(A&&D&&J.resultContext){if(G<A.length){var a=D[G/g.size];r((0,i.Z)((0,h.Z)({},q),{minCost:a.toFixed(2),optimal:null,progress:100*G/A.length})),J.resultContext.clearRect(0,0,n.Width,n.Width),J.resultContext.strokeStyle=n.LineColor,J.resultContext.lineWidth=12,J.resultContext.beginPath();for(var b=G;b<G+g.size;b++){var c,e,f=(0,d.Z)(t(A[b]),2),j=f[0],k=f[1],m=0,p=0;b+1==G+g.size?(m=(c=(0,d.Z)(t(A[G]),2))[0],p=c[1]):(m=(e=(0,d.Z)(t(A[b+1]),2))[0],p=e[1]),J.resultContext.moveTo(j,k),J.resultContext.lineTo(m,p)}J.resultContext.stroke(),H(G+g.size)}else G==A.length&&(o.solver===l.BF||o.solver===l.DP?r((0,i.Z)((0,h.Z)({},q),{optimal:"optimal",progress:100})):r((0,i.Z)((0,h.Z)({},q),{optimal:"heuristic",progress:100})))}},100),(0,e.jsx)(s,{bgCanvasRef:L,resultCanvasRef:M,size:n.Width})},x=c(2532),y=c(6946),z=c(6420),A=c(1734),B=function(){var a={useGenerator:(0,f.useState)({seed:Math.floor(100*Math.random()),size:m.Small}),useSolver:(0,f.useState)({solver:null}),useInfo:(0,f.useState)({progress:0,minCost:"inf",status:"",optimal:null})};return(0,e.jsx)(g.Z,{pagename:"Traveling Salesman",field:C(a),infoArea:D(a),generator:E(a),solver:F(a)})},C=function(a){var b=(0,e.jsx)(w,{hooks:a});return(0,e.jsx)(y.q,{hooks:a,field:b})},D=function(a){var b=(0,d.Z)(a.useGenerator,2),c=b[0];b[1];var f=(0,d.Z)(a.useInfo,2),g=f[0];return f[1],(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)("div",{children:["n=",c.size]}),(0,e.jsx)("div",{children:g.status}),(0,e.jsxs)("div",{children:["Minimum Cost: ",g.minCost,null===g.optimal?"":" ("+g.optimal+")"]}),(0,e.jsx)("div",{style:{color:"#C84B31"},children:c.size>300&&null===g.status?"Calculation may take a while.":""})]})},E=function(a){var b=(0,d.Z)(a.useInfo,2);b[0],b[1];var c=[(0,e.jsx)(z.Z,{value:m.Small,children:"Small"},"small"),(0,e.jsx)(z.Z,{value:m.Medium,children:"Medium"},"medium"),(0,e.jsx)(z.Z,{value:m.Large,children:"Large"},"large"),(0,e.jsx)(z.Z,{value:m.Extreme,children:"Extreme"},"extreme"),];return(0,A.Z)(a,o,c)},F=function(a){var b=(0,d.Z)(a.useGenerator,2),c=b[0];b[1];var f=[(0,e.jsx)(z.Z,{value:l.BF,disabled:c.size>12,children:l.BF},l.BF),(0,e.jsx)(z.Z,{value:l.DP,disabled:c.size>20,children:l.DP},l.DP),(0,e.jsx)(z.Z,{value:l.NN,children:l.NN},l.NN),(0,e.jsx)(z.Z,{value:l.TwoOpt,children:l.TwoOpt},l.TwoOpt),];return(0,x.Z)(a,o,f,"vertical")}},6895:function(a){a.exports={canvas_wrap:"style_canvas_wrap__cQjqG",canvas:"style_canvas__uOKal"}}},function(a){a.O(0,[775,129,19,660,774,888,179],function(){var b;return a(a.s=8642)}),_N_E=a.O()}])