/* tslint:disable */
/* eslint-disable */
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a: number, b: number): number;
/**
*/
export enum GridCell {
  Close,
  Open,
  Start,
  Goal,
}
/**
*/
export class Graph {
  free(): void;
/**
* @param {number} num_plots
* @param {number} seed
* @param {number} size
* @returns {Graph}
*/
  static new(num_plots: number, seed: number, size: number): Graph;
/**
*/
  build(): void;
/**
* @returns {Uint32Array}
*/
  get_nodes(): Uint32Array;
/**
* @returns {number}
*/
  seed(): number;
}
/**
*/
export class Grid {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @param {number} seed
* @returns {Grid}
*/
  static new(width: number, height: number, seed: number): Grid;
/**
*/
  initialize_values(): void;
/**
*/
  build(): void;
/**
* @returns {Uint32Array}
*/
  bfs(): Uint32Array;
/**
* @returns {Uint32Array}
*/
  dfs(): Uint32Array;
/**
* @returns {Uint32Array}
*/
  astar(): Uint32Array;
/**
* @param {number} x0
* @param {number} y0
* @param {number} x1
* @param {number} y1
* @param {string} option
* @returns {number}
*/
  calc_heuristics(x0: number, y0: number, x1: number, y1: number, option: string): number;
/**
* @param {number} x0
* @param {number} y0
* @param {number} x1
* @param {number} y1
* @returns {number}
*/
  calc_squared_euclidean_distance(x0: number, y0: number, x1: number, y1: number): number;
/**
* @param {number} x0
* @param {number} y0
* @param {number} x1
* @param {number} y1
* @returns {number}
*/
  calc_manhattan_distance(x0: number, y0: number, x1: number, y1: number): number;
/**
* @param {number} row
* @param {number} column
* @returns {boolean}
*/
  check_inside(row: number, column: number): boolean;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_index(row: number, column: number): number;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
/**
* @returns {number}
*/
  seed(): number;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get(row: number, column: number): number;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  get_value(row: number, column: number): number;
/**
* @returns {number}
*/
  get_goal_value(): number;
/**
* @returns {Uint32Array}
*/
  trace_back(): Uint32Array;
}
/**
*/
export class Xorshift {
  free(): void;
/**
* @returns {Xorshift}
*/
  static new(): Xorshift;
/**
* @param {bigint} seed
* @returns {Xorshift}
*/
  static with_seed(seed: bigint): Xorshift;
/**
* @returns {bigint}
*/
  next(): bigint;
/**
* @param {bigint} m
* @returns {bigint}
*/
  rand(m: bigint): bigint;
/**
* @returns {number}
*/
  randf(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_grid_free: (a: number) => void;
  readonly grid_new: (a: number, b: number, c: number) => number;
  readonly grid_initialize_values: (a: number) => void;
  readonly grid_build: (a: number) => void;
  readonly grid_bfs: (a: number, b: number) => void;
  readonly grid_dfs: (a: number, b: number) => void;
  readonly grid_astar: (a: number, b: number) => void;
  readonly grid_calc_heuristics: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly grid_calc_squared_euclidean_distance: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly grid_calc_manhattan_distance: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly grid_check_inside: (a: number, b: number, c: number) => number;
  readonly grid_get_index: (a: number, b: number, c: number) => number;
  readonly grid_width: (a: number) => number;
  readonly grid_height: (a: number) => number;
  readonly grid_cells: (a: number) => number;
  readonly grid_seed: (a: number) => number;
  readonly grid_get: (a: number, b: number, c: number) => number;
  readonly grid_get_value: (a: number, b: number, c: number) => number;
  readonly grid_get_goal_value: (a: number) => number;
  readonly grid_trace_back: (a: number, b: number) => void;
  readonly add: (a: number, b: number) => number;
  readonly __wbg_graph_free: (a: number) => void;
  readonly graph_new: (a: number, b: number, c: number) => number;
  readonly graph_build: (a: number) => void;
  readonly graph_get_nodes: (a: number, b: number) => void;
  readonly graph_seed: (a: number) => number;
  readonly __wbg_xorshift_free: (a: number) => void;
  readonly xorshift_new: () => number;
  readonly xorshift_with_seed: (a: number, b: number) => number;
  readonly xorshift_next: (a: number, b: number) => void;
  readonly xorshift_rand: (a: number, b: number, c: number, d: number) => void;
  readonly xorshift_randf: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
