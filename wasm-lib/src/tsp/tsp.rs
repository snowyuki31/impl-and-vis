use crate::utils::xorshift::Xorshift;
use itertools::Itertools;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[macro_export]
macro_rules!  console_log {
        // Note that this is using the `log` function imported above during
        // `bare_bones`
        ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
    }

#[wasm_bindgen]
pub struct Graph {
    num_plots: u32,
    size: u32,
    nodes: Vec<u32>,
    seed: u32,
    rng: Xorshift,
    costs: Vec<f64>,
    min_cost: f64,
}

#[wasm_bindgen]
impl Graph {
    pub fn new(num_plots: u32, seed: u32, size: u32) -> Graph {
        let rng = Xorshift::with_seed((seed + 42 * ((seed == 0) as u32)).into());
        let nodes = Vec::new();

        Graph {
            num_plots,
            size,
            nodes,
            seed,
            rng,
            costs: Vec::new(),
            min_cost: 2e9,
        }
    }

    pub fn build(&mut self) {
        for _ in 0..self.num_plots {
            let (x, y) = (
                self.rng.rand(self.size as u64) as u32,
                self.rng.rand(self.size as u64) as u32,
            );
            self.nodes.push(x * self.size + y);
        }
    }

    pub fn get_nodes(&self) -> Vec<u32> {
        self.nodes.clone()
    }

    pub fn get_costs(&self) -> Vec<f64> {
        self.costs.clone()
    }

    pub fn seed(&self) -> u32 {
        self.seed
    }

    fn get_coord(&self, c: u32) -> (u32, u32) {
        (c % self.size, (c - c % self.size) / self.size)
    }

    fn calc_distance(&self, c0: u32, c1: u32) -> f64 {
        let (x0, y0) = self.get_coord(c0);
        let (x1, y1) = self.get_coord(c1);

        let dx = x0.abs_diff(x1);
        let dy = y0.abs_diff(y1);

        ((dx * dx + dy * dy) as f64).sqrt()
    }

    pub fn solve_bf(&mut self) -> Vec<u32> {
        let mut min_cost = 2e9;
        let l = self.nodes.len();

        let mut paths = Vec::new();
        for perm in self.nodes[1..l].iter().permutations(l - 1) {
            let mut sum = 0.0;
            sum += self.calc_distance(self.nodes[0], *perm[0]);
            sum += self.calc_distance(self.nodes[0], *perm[l - 2]);

            // paths.push(self.nodes[0]);

            for i in 0..(l - 2) {
                sum += self.calc_distance(*perm[i], *perm[i + 1]);
                // paths.push(*perm[i]);
            }
            // paths.push(*perm[l - 2]);

            // self.costs.push(sum);

            if min_cost > sum {
                self.min_cost = sum;
                min_cost = sum;

                paths.push(self.nodes[0]);
                for i in 0..(l - 1) {
                    paths.push(*perm[i]);
                }
                self.costs.push(min_cost);
            }
        }

        paths
    }

    pub fn solve_dp(&mut self) -> Vec<u32> {
        let l = self.nodes.len();
        let mut dp = vec![vec![2e9; l]; 1 << l];
        let mut pos = vec![vec![2e9 as u32; l]; 1 << l];
        dp[0][0] = 0.0;

        for s in 0..(1 << l) {
            for u in 0..l {
                for v in 0..l {
                    if s != 0 && ((s & (1 << u)) == 0) {
                        continue;
                    }

                    if (s & (1 << v)) == 0 && v != u {
                        // u?????????????????????v????????????
                        let next_cost = dp[s][u] + self.calc_distance(self.nodes[u], self.nodes[v]);
                        if dp[s | (1 << v)][v] > next_cost {
                            dp[s | (1 << v)][v] = next_cost;
                            pos[s | (1 << v)][v] = u as u32; // u->v???????????????????????????????????????
                        }
                    }
                }
            }
        }
        self.min_cost = dp[((1u32 << l) - 1) as usize][0];
        self.costs.push(dp[((1u32 << l) - 1) as usize][0]);

        let mut paths = Vec::new();

        // ????????????
        let mut state = ((1u32 << l) - 1) as usize;
        let mut cur = 0;
        for _ in 0..l {
            let next = pos[state][cur] as usize;
            paths.push(self.nodes[next]);
            state = state - (1 << cur);
            cur = next;
        }

        paths
    }

    pub fn solve_nn(&mut self) -> Vec<u32> {
        let mut paths = Vec::new();

        let num_iter = std::cmp::min(
            1000 * 1000 / (self.nodes.len() * self.nodes.len()),
            self.nodes.len(),
        );

        for start in 0..num_iter {
            let mut visited = vec![false; self.nodes.len()];

            let mut cur = start;
            let mut cost = 0.0;
            let mut cur_path = Vec::new();

            cur_path.push(self.nodes[cur]);
            for _ in 0..(self.nodes.len() - 1) {
                visited[cur] = true;

                let mut next = !0;
                let mut min_edge = 2e18;
                for i in 0..self.nodes.len() {
                    if !visited[i] {
                        let d = self.calc_distance(self.nodes[cur], self.nodes[i]);
                        if min_edge > d {
                            min_edge = d;
                            next = i;
                        }
                    }
                }

                cost += min_edge;
                cur = next;
                cur_path.push(self.nodes[cur]);
            }
            cost += self.calc_distance(self.nodes[cur], self.nodes[start]);

            if self.min_cost > cost {
                self.min_cost = cost;
                self.costs.push(cost);
                for v in cur_path.into_iter() {
                    paths.push(v);
                }
            }
        }
        paths
    }

    pub fn two_opt(&mut self) -> Vec<u32> {
        let mut paths = self.solve_nn();
        let l = self.nodes.len();

        let mut cur_path = Vec::new();
        for i in (paths.len() - l)..(paths.len()) {
            cur_path.push(paths[i]);
        }

        self.local_search(&mut cur_path, &mut paths, *self.costs.last().unwrap());
        paths
    }

    fn local_search(
        &mut self,
        cur_path: &mut Vec<u32>,
        path_log: &mut Vec<u32>,
        prev_cost: f64,
    ) -> f64 {
        let l = self.nodes.len();
        let mut cur_cost = prev_cost;
        loop {
            let mut flag = false;
            for i0 in 0..(l - 1) {
                let i1 = i0 + 1;
                for j0 in (i0 + 2)..l {
                    let j1 = (j0 + 1) % l;

                    if i0 != 0 || j1 != 0 {
                        let cur0 = self.calc_distance(cur_path[i0], cur_path[i1]);
                        let cur1 = self.calc_distance(cur_path[j0], cur_path[j1]);
                        let next0 = self.calc_distance(cur_path[i0], cur_path[j0]);
                        let next1 = self.calc_distance(cur_path[j1], cur_path[i1]);

                        if cur0 + cur1 > next0 + next1 {
                            flag = true;
                            cur_path[i1..=j0].reverse();

                            cur_cost -= cur0 + cur1 - next0 - next1;

                            if cur_cost < *self.costs.last().unwrap() {
                                self.costs.push(cur_cost);

                                for v in cur_path.iter() {
                                    path_log.push(*v);
                                }
                            }
                        }
                    }
                }
            }
            if !flag {
                break;
            }
        }
        cur_cost
    }

    pub fn iterative_local_search(&mut self) -> Vec<u32> {
        let mut paths = self.solve_nn();
        let l = self.nodes.len();

        let mut cur_path = Vec::new();
        for i in (paths.len() - l)..(paths.len()) {
            cur_path.push(paths[i]);
        }

        let mut prev_cost =
            self.local_search(&mut cur_path, &mut paths, *self.costs.last().unwrap());

        for _ in 0..200 {
            // kick
            let (mut a, mut c, mut e, mut g) = (0, 0, 0, 0);
            while !(a < c && c < e && e < g) {
                (a, c, e, g) = (
                    self.rng.rand(l as u64) as usize,
                    self.rng.rand(l as u64) as usize,
                    self.rng.rand(l as u64) as usize,
                    self.rng.rand(l as u64) as usize,
                );
            }
            let mut next_path = Vec::new();
            for i in a..c {
                next_path.push(cur_path[i]);
            }
            for i in g..(a + l) {
                next_path.push(cur_path[i % l]);
            }
            for i in e..g {
                next_path.push(cur_path[i]);
            }
            for i in c..e {
                next_path.push(cur_path[i]);
            }
            let (b, d, f, h) = (c - 1, e - 1, g - 1, (a - 1 + l) % l);

            let bc = self.calc_distance(cur_path[b], cur_path[c]);
            let de = self.calc_distance(cur_path[d], cur_path[e]);
            let fg = self.calc_distance(cur_path[f], cur_path[g]);
            let ha = self.calc_distance(cur_path[h], cur_path[a]);

            let bg = self.calc_distance(cur_path[b], cur_path[g]);
            let da = self.calc_distance(cur_path[d], cur_path[a]);
            let fc = self.calc_distance(cur_path[f], cur_path[c]);
            let he = self.calc_distance(cur_path[h], cur_path[e]);

            prev_cost += (bg + da + fc + he) - (bc + de + fg + ha);

            cur_path = next_path;

            prev_cost = self.local_search(&mut cur_path, &mut paths, prev_cost);
        }

        paths
    }
}

#[test]
fn test_tsp_solve() {
    let mut graph_dp = Graph::new(8, 5, 400);
    let mut graph_bf = Graph::new(8, 5, 400);

    graph_dp.build();
    graph_dp.solve_dp();

    graph_bf.build();
    graph_bf.solve_bf();

    assert_eq!(graph_dp.min_cost, graph_bf.min_cost);
}

#[test]
fn test_tsp_solve_dp() {
    let mut graph_dp = Graph::new(8, 25, 400);
    graph_dp.build();

    let paths = graph_dp.solve_dp();

    let l = graph_dp.nodes.len();
    let mut sum = 0.0;
    for i in 0..l {
        sum += graph_dp.calc_distance(paths[i], paths[(i + 1) % l]);
    }

    eprintln!("sum result: {}, min_cost: {}", sum, graph_dp.min_cost);

    assert!((sum - graph_dp.min_cost) < 0.001);
}

// #[test]
// fn test_tsp_solve_nn() {
//     let mut graph = Graph::new(8, 25, 400);
//     graph.build();

//     let paths = graph.solve_nn();
//     eprintln!("{:?}", paths);
// }
