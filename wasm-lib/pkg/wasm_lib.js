
let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint32Memory0 = new Uint32Array();

function getUint32Memory0() {
    if (cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a, b) {
    const ret = wasm.add(a, b);
    return ret;
}

let cachedFloat64Memory0 = new Float64Array();

function getFloat64Memory0() {
    if (cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function getArrayF64FromWasm0(ptr, len) {
    return getFloat64Memory0().subarray(ptr / 8, ptr / 8 + len);
}

const u32CvtShim = new Uint32Array(2);

const uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
/**
*/
export const GridCell = Object.freeze({ Close:0,"0":"Close",Open:1,"1":"Open",Start:2,"2":"Start",Goal:3,"3":"Goal", });
/**
*/
export class Graph {

    static __wrap(ptr) {
        const obj = Object.create(Graph.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_graph_free(ptr);
    }
    /**
    * @param {number} num_plots
    * @param {number} seed
    * @param {number} size
    * @returns {Graph}
    */
    static new(num_plots, seed, size) {
        const ret = wasm.graph_new(num_plots, seed, size);
        return Graph.__wrap(ret);
    }
    /**
    */
    build() {
        wasm.graph_build(this.ptr);
    }
    /**
    * @returns {Uint32Array}
    */
    get_nodes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.graph_get_nodes(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Float64Array}
    */
    get_costs() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.graph_get_costs(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayF64FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 8);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    seed() {
        const ret = wasm.graph_seed(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Uint32Array}
    */
    solve_bf() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.graph_solve_bf(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint32Array}
    */
    solve_dp() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.graph_solve_dp(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint32Array}
    */
    solve_nn() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.graph_solve_nn(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class Grid {

    static __wrap(ptr) {
        const obj = Object.create(Grid.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_grid_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} seed
    * @returns {Grid}
    */
    static new(width, height, seed) {
        const ret = wasm.grid_new(width, height, seed);
        return Grid.__wrap(ret);
    }
    /**
    */
    initialize_values() {
        wasm.grid_initialize_values(this.ptr);
    }
    /**
    */
    build() {
        wasm.grid_build(this.ptr);
    }
    /**
    * @returns {Uint32Array}
    */
    bfs() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.grid_bfs(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint32Array}
    */
    dfs() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.grid_dfs(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint32Array}
    */
    astar() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.grid_astar(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} x0
    * @param {number} y0
    * @param {number} x1
    * @param {number} y1
    * @param {string} option
    * @returns {number}
    */
    calc_heuristics(x0, y0, x1, y1, option) {
        const ptr0 = passStringToWasm0(option, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.grid_calc_heuristics(this.ptr, x0, y0, x1, y1, ptr0, len0);
        return ret;
    }
    /**
    * @param {number} x0
    * @param {number} y0
    * @param {number} x1
    * @param {number} y1
    * @returns {number}
    */
    calc_squared_euclidean_distance(x0, y0, x1, y1) {
        const ret = wasm.grid_calc_squared_euclidean_distance(this.ptr, x0, y0, x1, y1);
        return ret;
    }
    /**
    * @param {number} x0
    * @param {number} y0
    * @param {number} x1
    * @param {number} y1
    * @returns {number}
    */
    calc_manhattan_distance(x0, y0, x1, y1) {
        const ret = wasm.grid_calc_manhattan_distance(this.ptr, x0, y0, x1, y1);
        return ret;
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {boolean}
    */
    check_inside(row, column) {
        const ret = wasm.grid_check_inside(this.ptr, row, column);
        return ret !== 0;
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_index(row, column) {
        const ret = wasm.grid_get_index(this.ptr, row, column);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.grid_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        const ret = wasm.grid_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    cells() {
        const ret = wasm.grid_cells(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    seed() {
        const ret = wasm.grid_seed(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get(row, column) {
        const ret = wasm.grid_get(this.ptr, row, column);
        return ret >>> 0;
    }
    /**
    * @param {number} row
    * @param {number} column
    * @returns {number}
    */
    get_value(row, column) {
        const ret = wasm.grid_get_value(this.ptr, row, column);
        return ret;
    }
    /**
    * @returns {number}
    */
    get_goal_value() {
        const ret = wasm.grid_get_goal_value(this.ptr);
        return ret;
    }
    /**
    * @returns {Uint32Array}
    */
    trace_back() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.grid_trace_back(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class Xorshift {

    static __wrap(ptr) {
        const obj = Object.create(Xorshift.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_xorshift_free(ptr);
    }
    /**
    * @returns {Xorshift}
    */
    static new() {
        const ret = wasm.xorshift_new();
        return Xorshift.__wrap(ret);
    }
    /**
    * @param {bigint} seed
    * @returns {Xorshift}
    */
    static with_seed(seed) {
        uint64CvtShim[0] = seed;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        const ret = wasm.xorshift_with_seed(low0, high0);
        return Xorshift.__wrap(ret);
    }
    /**
    * @returns {bigint}
    */
    next() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.xorshift_next(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            u32CvtShim[0] = r0;
            u32CvtShim[1] = r1;
            const n0 = uint64CvtShim[0];
            return n0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} m
    * @returns {bigint}
    */
    rand(m) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            uint64CvtShim[0] = m;
            const low0 = u32CvtShim[0];
            const high0 = u32CvtShim[1];
            wasm.xorshift_rand(retptr, this.ptr, low0, high0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            u32CvtShim[0] = r0;
            u32CvtShim[1] = r1;
            const n1 = uint64CvtShim[0];
            return n1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    randf() {
        const ret = wasm.xorshift_randf(this.ptr);
        return ret;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = new Float64Array();
    cachedInt32Memory0 = new Int32Array();
    cachedUint32Memory0 = new Uint32Array();
    cachedUint8Memory0 = new Uint8Array();


    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('wasm_lib_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
