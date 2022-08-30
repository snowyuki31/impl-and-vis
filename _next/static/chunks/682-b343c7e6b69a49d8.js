"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[682],{6092:function(a,b,c){var d=c(5893);c(7294);var e=c(6720),f=c(9008),g=c.n(f),h=c(7357),i=c(3156),j=c(8239),k=c(1927),l=(0,j.Z)({palette:{mode:"dark"},breakpoints:{values:{xs:0,sm:600,md:768,lg:1025,xl:1536}}}),m=function(a){var b=a.pagename,c=a.children;return(0,d.jsx)(k.Z,{theme:l,children:(0,d.jsxs)(i.Z,{component:"main",maxWidth:"md",children:[(0,d.jsx)(e.ZP,{}),(0,d.jsx)(g(),{children:(0,d.jsx)("title",{children:(""!==b?b+" | ":"")+"Impl-and-vis"})}),(0,d.jsx)(h.Z,{sx:{marginTop:{xs:4,md:0},marginBottom:{xs:20,md:0},paddingTop:{xs:0,md:8},paddingBottom:{xs:0,md:8},display:"flex",flexDirection:"column",alignItems:"center",height:"100vh"},children:c})]})})};b.Z=m},6855:function(a,b,c){c.d(b,{IH:function(){return u},kJ:function(){return y},r8:function(){return x},rj:function(){return z}});var d,e=c(7568),f=c(1438),g=c(2951),h=c(2670),i=c(4051),j=c.n(i),k=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});k.decode();var l=new Uint8Array;function m(){return 0===l.byteLength&&(l=new Uint8Array(d.memory.buffer)),l}var n=new Int32Array;function o(){return 0===n.byteLength&&(n=new Int32Array(d.memory.buffer)),n}var p=new Uint32Array;function q(a,b){return(0===p.byteLength&&(p=new Uint32Array(d.memory.buffer)),p).subarray(a/4,a/4+b)}var r=0,s=new TextEncoder("utf-8"),t="function"==typeof s.encodeInto?function(a,b){return s.encodeInto(a,b)}:function(a,b){var c=s.encode(a);return b.set(c),{read:a.length,written:c.length}};function u(a,b){return d.add(a,b)}var v=new Float64Array,w=new Uint32Array(2);new BigUint64Array(w.buffer);var x=Object.freeze({Close:0,"0":"Close",Open:1,"1":"Open",Start:2,"2":"Start",Goal:3,"3":"Goal"}),y=function(){function a(){(0,f.Z)(this,a)}return(0,g.Z)(a,[{key:"__destroy_into_raw",value:function(){var a=this.ptr;return this.ptr=0,a}},{key:"free",value:function(){var a=this.__destroy_into_raw();d.__wbg_graph_free(a)}},{key:"build",value:function(){d.graph_build(this.ptr)}},{key:"get_nodes",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.graph_get_nodes(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"get_costs",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.graph_get_costs(a,this.ptr);var b,c,e=o()[a/4+0],f=o()[a/4+1],g=(b=e,c=f,(0===v.byteLength&&(v=new Float64Array(d.memory.buffer)),v).subarray(b/8,b/8+c)).slice();return d.__wbindgen_free(e,8*f),g}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"seed",value:function(){return d.graph_seed(this.ptr)>>>0}},{key:"solve_bf",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.graph_solve_bf(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"solve_dp",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.graph_solve_dp(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"solve_nn",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.graph_solve_nn(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"two_opt",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.graph_two_opt(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}}],[{key:"__wrap",value:function(b){var c=Object.create(a.prototype);return c.ptr=b,c}},{key:"new",value:function(b,c,e){var f=d.graph_new(b,c,e);return a.__wrap(f)}}]),a}(),z=function(){function a(){(0,f.Z)(this,a)}return(0,g.Z)(a,[{key:"__destroy_into_raw",value:function(){var a=this.ptr;return this.ptr=0,a}},{key:"free",value:function(){var a=this.__destroy_into_raw();d.__wbg_grid_free(a)}},{key:"initialize_values",value:function(){d.grid_initialize_values(this.ptr)}},{key:"build",value:function(){d.grid_build(this.ptr)}},{key:"bfs",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.grid_bfs(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"dfs",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.grid_dfs(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"astar",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.grid_astar(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}},{key:"calc_heuristics",value:function(a,b,c,e,f){var g=function(a,b,c){if(void 0===c){var d=s.encode(a),e=b(d.length);return m().subarray(e,e+d.length).set(d),r=d.length,e}for(var f=a.length,g=b(f),h=m(),i=0;i<f;i++){var j=a.charCodeAt(i);if(j>127)break;h[g+i]=j}if(i!==f){0!==i&&(a=a.slice(i)),g=c(g,f,f=i+3*a.length);var k=m().subarray(g+i,g+f),l=t(a,k);i+=l.written}return r=i,g}(f,d.__wbindgen_malloc,d.__wbindgen_realloc),h=r;return d.grid_calc_heuristics(this.ptr,a,b,c,e,g,h)}},{key:"calc_squared_euclidean_distance",value:function(a,b,c,e){return d.grid_calc_squared_euclidean_distance(this.ptr,a,b,c,e)}},{key:"calc_manhattan_distance",value:function(a,b,c,e){return d.grid_calc_manhattan_distance(this.ptr,a,b,c,e)}},{key:"check_inside",value:function(a,b){return 0!==d.grid_check_inside(this.ptr,a,b)}},{key:"get_index",value:function(a,b){return d.grid_get_index(this.ptr,a,b)>>>0}},{key:"width",value:function(){return d.grid_width(this.ptr)>>>0}},{key:"height",value:function(){return d.grid_height(this.ptr)>>>0}},{key:"cells",value:function(){return d.grid_cells(this.ptr)}},{key:"seed",value:function(){return d.grid_seed(this.ptr)>>>0}},{key:"get",value:function(a,b){return d.grid_get(this.ptr,a,b)>>>0}},{key:"get_value",value:function(a,b){return d.grid_get_value(this.ptr,a,b)}},{key:"get_goal_value",value:function(){return d.grid_get_goal_value(this.ptr)}},{key:"trace_back",value:function(){try{var a=d.__wbindgen_add_to_stack_pointer(-16);d.grid_trace_back(a,this.ptr);var b=o()[a/4+0],c=o()[a/4+1],e=q(b,c).slice();return d.__wbindgen_free(b,4*c),e}finally{d.__wbindgen_add_to_stack_pointer(16)}}}],[{key:"__wrap",value:function(b){var c=Object.create(a.prototype);return c.ptr=b,c}},{key:"new",value:function(b,c,e){var f=d.grid_new(b,c,e);return a.__wrap(f)}}]),a}();function A(a,b){return B.apply(this,arguments)}function B(){return(B=(0,e.Z)(j().mark(function a(b,c){var d,e;return j().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!("function"==typeof Response&&(0,h.Z)(b,Response))){a.next=23;break}if("function"!=typeof WebAssembly.instantiateStreaming){a.next=15;break}return a.prev=2,a.next=5,WebAssembly.instantiateStreaming(b,c);case 5:case 20:return a.abrupt("return",a.sent);case 8:if(a.prev=8,a.t0=a.catch(2),!("application/wasm"!=b.headers.get("Content-Type"))){a.next=14;break}console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",a.t0),a.next=15;break;case 14:throw a.t0;case 15:return a.next=17,b.arrayBuffer();case 17:return d=a.sent,a.next=20,WebAssembly.instantiate(d,c);case 23:return a.next=25,WebAssembly.instantiate(b,c);case 25:if(e=a.sent,!(0,h.Z)(e,WebAssembly.Instance)){a.next=30;break}return a.abrupt("return",{instance:e,module:b});case 30:return a.abrupt("return",e);case 31:case"end":return a.stop()}},a,null,[[2,8]])}))).apply(this,arguments)}function C(){var a={};return a.wbg={},a.wbg.__wbindgen_throw=function(a,b){var c,d;throw Error((c=a,d=b,k.decode(m().subarray(c,c+d))))},a}function D(a,b){}function E(a,b){return d=a.exports,F.__wbindgen_wasm_module=b,v=new Float64Array,n=new Int32Array,p=new Uint32Array,l=new Uint8Array,d}function F(a){return G.apply(this,arguments)}function G(){return(G=(0,e.Z)(j().mark(function a(b){var d,e,f,g;return j().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return void 0===b&&(b=new c.U(c(8272))),d=C(),("string"==typeof b||"function"==typeof Request&&(0,h.Z)(b,Request)||"function"==typeof URL&&(0,h.Z)(b,URL))&&(b=fetch(b)),D(d),a.t0=A,a.next=7,b;case 7:return a.t1=a.sent,a.t2=d,a.next=11,(0,a.t0)(a.t1,a.t2);case 11:return f=(e=a.sent).instance,g=e.module,a.abrupt("return",E(f,g));case 15:case"end":return a.stop()}},a)}))).apply(this,arguments)}b.ZP=F},8272:function(a,b,c){a.exports=c.p+"static/media/wasm_lib_bg.c1014c34.wasm"}}])