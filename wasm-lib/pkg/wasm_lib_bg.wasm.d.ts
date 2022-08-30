/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_grid_free(a: number): void;
export function grid_new(a: number, b: number, c: number): number;
export function grid_initialize_values(a: number): void;
export function grid_build(a: number): void;
export function grid_bfs(a: number, b: number): void;
export function grid_dfs(a: number, b: number): void;
export function grid_astar(a: number, b: number): void;
export function grid_calc_heuristics(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function grid_calc_squared_euclidean_distance(a: number, b: number, c: number, d: number, e: number): number;
export function grid_calc_manhattan_distance(a: number, b: number, c: number, d: number, e: number): number;
export function grid_check_inside(a: number, b: number, c: number): number;
export function grid_get_index(a: number, b: number, c: number): number;
export function grid_width(a: number): number;
export function grid_height(a: number): number;
export function grid_cells(a: number): number;
export function grid_seed(a: number): number;
export function grid_get(a: number, b: number, c: number): number;
export function grid_get_value(a: number, b: number, c: number): number;
export function grid_get_goal_value(a: number): number;
export function grid_trace_back(a: number, b: number): void;
export function add(a: number, b: number): number;
export function __wbg_graph_free(a: number): void;
export function graph_new(a: number, b: number, c: number): number;
export function graph_build(a: number): void;
export function graph_get_nodes(a: number, b: number): void;
export function graph_get_costs(a: number, b: number): void;
export function graph_seed(a: number): number;
export function graph_solve_bf(a: number, b: number): void;
export function graph_solve_dp(a: number, b: number): void;
export function graph_solve_nn(a: number, b: number): void;
export function graph_two_opt(a: number, b: number): void;
export function __wbg_xorshift_free(a: number): void;
export function xorshift_new(): number;
export function xorshift_with_seed(a: number, b: number): number;
export function xorshift_next(a: number, b: number): void;
export function xorshift_rand(a: number, b: number, c: number, d: number): void;
export function xorshift_randf(a: number): number;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
