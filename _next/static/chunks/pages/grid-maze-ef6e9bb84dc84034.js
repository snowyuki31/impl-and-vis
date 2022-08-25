(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[218],{8976:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/grid-maze",function(){return c(4849)}])},2718:function(a,b,c){"use strict";var d=c(5893);c(7294);var e=c(6720),f=c(7357),g=c(3156),h=c(1265),i=c(1927),j=(0,h.Z)({palette:{mode:"dark"},breakpoints:{values:{xs:0,sm:600,md:768,lg:1025,xl:1536}}}),k=function(a){var b=a.children;return(0,d.jsx)(i.Z,{theme:j,children:(0,d.jsxs)(g.Z,{component:"main",maxWidth:"lg",children:[(0,d.jsx)(e.ZP,{}),(0,d.jsx)(f.Z,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:b})]})})};b.Z=k},4849:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return s}});var d=c(5893),e=c(7294),f=c(2718),g=c(922),h=c.n(g),i=function(a){var b="".concat(h().cell);return a.states.forEach(function(a){b+=" ".concat(h()[a])}),(0,d.jsx)("div",{className:b})},j=i,k=c(6855),l=c(5402),m=c.n(l);function n(a,b,c){for(var e=[],f=0;f<b;f++){for(var g=[],h=0;h<c;h++){var i=[],l=a.get(f,h);l===k.r8.Close?i.push("close"):l==k.r8.Start?i.push("start"):l==k.r8.Goal?i.push("goal"):i.push("open"),-1!=a.get_value(f,h)&&l==k.r8.Open&&i.push("visited"),g.push((0,d.jsx)(j,{states:i,value:f*b+h}))}e.push((0,d.jsx)("div",{className:m().row,children:g}))}return e}var o=function(a){var b=(0,e.useState)(),c=b[0],f=b[1],g=(0,e.useState)(),h=g[0],i=g[1],l=(0,e.useState)(-1),o=l[0],p=l[1],q=(0,e.useState)(-1),r=q[0],s=q[1];return(0,e.useEffect)(function(){(0,k.ZP)().then(function(){var b=k.rj.new(a.width,a.height,a.seed);b.build(),f(b),p(-1),s(-1),i(n(b,null==b?void 0:b.width(),null==b?void 0:b.height()))})},[a.seed,a.width,a.height]),(0,e.useEffect)(function(){if(c&&"bfs"===a.solver){var b=c.bfs();i(n(c,null==c?void 0:c.width(),null==c?void 0:c.height())),p(c.get_goal_value()),s(b),console.log("BFS Done!")}else if(c&&"astar_manhattan"===a.solver){var d=c.astar();i(n(c,null==c?void 0:c.width(),null==c?void 0:c.height())),p(c.get_goal_value()),s(d),console.log("A* Done!")}},[a.solver]),(0,d.jsxs)("div",{className:m().container,children:[(0,d.jsx)("div",{className:m().maze,children:h}),(0,d.jsxs)("div",{className:m().legend,children:[(0,d.jsxs)("div",{children:["Start",(0,d.jsx)(j,{states:["start","legend"],value:-1})]}),(0,d.jsxs)("div",{children:["Goal",(0,d.jsx)(j,{states:["goal","legend"],value:-1})]})]}),(0,d.jsxs)("div",{className:m().result,children:[(0,d.jsxs)("div",{children:["Minimum Distance: ",-1!=o?o:"-"]}),(0,d.jsxs)("div",{children:["Calculation Steps: ",-1!=r?r:"-"]})]})]})},p=c(6447),q=c(2630),r=c(4279),s=function(){var a=(0,e.useState)(35),b=a[0];a[1];var c=(0,e.useState)(35),g=c[0];c[1];var h=(0,e.useState)(42),i=h[0],j=h[1],k=(0,e.useState)("None"),l=k[0],m=k[1];return(0,d.jsxs)(f.Z,{children:[(0,d.jsx)("h1",{children:"Grid Maze"}),(0,d.jsx)(r.Z,{type:"number",label:"seed",variant:"standard",size:"small",value:i,onChange:function(a){t(a,j),m("None")}}),(0,d.jsx)(o,{width:b,height:g,seed:i,solver:l}),(0,d.jsx)("h3",{children:"Solve by"}),(0,d.jsxs)(p.Z,{spacing:2,direction:"row",children:[(0,d.jsx)(q.Z,{variant:"outlined",onClick:function(){return m("bfs")},children:"BFS"}),(0,d.jsx)(q.Z,{variant:"outlined",onClick:function(){return m("astar_manhattan")},children:"A*"})]})]})},t=function(a,b){b(function(){return Number(a.target.value)})}},6855:function(a,b,c){"use strict";c.d(b,{IH:function(){return s},r8:function(){return t},rj:function(){return u}});var d,e=c(7568),f=c(1438),g=c(2951),h=c(2670),i=c(4051),j=c.n(i),k=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});k.decode();var l=new Uint8Array;function m(){return 0===l.byteLength&&(l=new Uint8Array(d.memory.buffer)),l}var n=0,o=new TextEncoder("utf-8"),p="function"==typeof o.encodeInto?function(a,b){return o.encodeInto(a,b)}:function(a,b){var c=o.encode(a);return b.set(c),{read:a.length,written:c.length}},q=new Uint32Array(2);new BigUint64Array(q.buffer);var r=new Int32Array;function s(a,b){return d.add(a,b)}var t=Object.freeze({Close:0,"0":"Close",Open:1,"1":"Open",Start:2,"2":"Start",Goal:3,"3":"Goal"}),u=function(){function a(){(0,f.Z)(this,a)}return(0,g.Z)(a,[{key:"__destroy_into_raw",value:function(){var a=this.ptr;return this.ptr=0,a}},{key:"free",value:function(){var a=this.__destroy_into_raw();d.__wbg_grid_free(a)}},{key:"initialize_values",value:function(){d.grid_initialize_values(this.ptr)}},{key:"build",value:function(){d.grid_build(this.ptr)}},{key:"bfs",value:function(){return d.grid_bfs(this.ptr)}},{key:"astar",value:function(){return d.grid_astar(this.ptr)}},{key:"calc_heuristics",value:function(a,b,c,e,f){var g=function(a,b,c){if(void 0===c){var d=o.encode(a),e=b(d.length);return m().subarray(e,e+d.length).set(d),n=d.length,e}for(var f=a.length,g=b(f),h=m(),i=0;i<f;i++){var j=a.charCodeAt(i);if(j>127)break;h[g+i]=j}if(i!==f){0!==i&&(a=a.slice(i)),g=c(g,f,f=i+3*a.length);var k=m().subarray(g+i,g+f),l=p(a,k);i+=l.written}return n=i,g}(f,d.__wbindgen_malloc,d.__wbindgen_realloc),h=n;return d.grid_calc_heuristics(this.ptr,a,b,c,e,g,h)}},{key:"calc_euclidean_distance",value:function(a,b,c,e){return d.grid_calc_euclidean_distance(this.ptr,a,b,c,e)}},{key:"calc_manhattan_distance",value:function(a,b,c,e){return d.grid_calc_manhattan_distance(this.ptr,a,b,c,e)}},{key:"check_inside",value:function(a,b){return 0!==d.grid_check_inside(this.ptr,a,b)}},{key:"get_index",value:function(a,b){return d.grid_get_index(this.ptr,a,b)>>>0}},{key:"width",value:function(){return d.grid_width(this.ptr)>>>0}},{key:"height",value:function(){return d.grid_height(this.ptr)>>>0}},{key:"cells",value:function(){return d.grid_cells(this.ptr)}},{key:"seed",value:function(){return d.grid_seed(this.ptr)>>>0}},{key:"get",value:function(a,b){return d.grid_get(this.ptr,a,b)>>>0}},{key:"get_value",value:function(a,b){return d.grid_get_value(this.ptr,a,b)}},{key:"get_goal_value",value:function(){return d.grid_get_goal_value(this.ptr)}}],[{key:"__wrap",value:function(b){var c=Object.create(a.prototype);return c.ptr=b,c}},{key:"new",value:function(b,c,e){var f=d.grid_new(b,c,e);return a.__wrap(f)}}]),a}();function v(a,b){return w.apply(this,arguments)}function w(){return(w=(0,e.Z)(j().mark(function a(b,c){var d,e;return j().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!("function"==typeof Response&&(0,h.Z)(b,Response))){a.next=23;break}if("function"!=typeof WebAssembly.instantiateStreaming){a.next=15;break}return a.prev=2,a.next=5,WebAssembly.instantiateStreaming(b,c);case 5:case 20:return a.abrupt("return",a.sent);case 8:if(a.prev=8,a.t0=a.catch(2),!("application/wasm"!=b.headers.get("Content-Type"))){a.next=14;break}console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",a.t0),a.next=15;break;case 14:throw a.t0;case 15:return a.next=17,b.arrayBuffer();case 17:return d=a.sent,a.next=20,WebAssembly.instantiate(d,c);case 23:return a.next=25,WebAssembly.instantiate(b,c);case 25:if(e=a.sent,!(0,h.Z)(e,WebAssembly.Instance)){a.next=30;break}return a.abrupt("return",{instance:e,module:b});case 30:return a.abrupt("return",e);case 31:case"end":return a.stop()}},a,null,[[2,8]])}))).apply(this,arguments)}function x(){var a={};return a.wbg={},a.wbg.__wbindgen_throw=function(a,b){var c,d;throw Error((c=a,d=b,k.decode(m().subarray(c,c+d))))},a}function y(a,b){}function z(a,b){return d=a.exports,A.__wbindgen_wasm_module=b,r=new Int32Array,l=new Uint8Array,d}function A(a){return B.apply(this,arguments)}function B(){return(B=(0,e.Z)(j().mark(function a(b){var d,e,f,g;return j().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return void 0===b&&(b=new c.U(c(8272))),d=x(),("string"==typeof b||"function"==typeof Request&&(0,h.Z)(b,Request)||"function"==typeof URL&&(0,h.Z)(b,URL))&&(b=fetch(b)),y(d),a.t0=v,a.next=7,b;case 7:return a.t1=a.sent,a.t2=d,a.next=11,(0,a.t0)(a.t1,a.t2);case 11:return f=(e=a.sent).instance,g=e.module,a.abrupt("return",z(f,g));case 15:case"end":return a.stop()}},a)}))).apply(this,arguments)}b.ZP=A},922:function(a){a.exports={cell:"style_cell__zjXtD",legend:"style_legend__LDa_b",open:"style_open__arZ5Z",close:"style_close__0G5pi",start:"style_start__xuIj9",goal:"style_goal__4P6tO",visited:"style_visited__cZver"}},5402:function(a){a.exports={row:"style_row__UOCJF",maze:"style_maze__95dNv",legend:"style_legend__9etWL",result:"style_result__B6mIP"}},8272:function(a,b,c){"use strict";a.exports=c.p+"static/media/wasm_lib_bg.09047750.wasm"}},function(a){a.O(0,[225,941,774,888,179],function(){var b;return a(a.s=8976)}),_N_E=a.O()}])