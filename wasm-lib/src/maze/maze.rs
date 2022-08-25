use crate::utils::xorshift::Xorshift;
use std::cmp::Reverse;
use std::collections::{BinaryHeap, VecDeque};
use wasm_bindgen::prelude::*;

const DIJ: [(u32, u32); 4] = [(0, 1), (1, 0), (0, !0), (!0, 0)];
const SHUFFLED_DIRECTION: [[usize; 4]; 24] = [
    [0, 1, 2, 3],
    [0, 1, 3, 2],
    [0, 2, 1, 3],
    [0, 2, 3, 1],
    [0, 3, 1, 2],
    [0, 3, 2, 1],
    [1, 0, 2, 3],
    [1, 0, 3, 2],
    [1, 2, 0, 3],
    [1, 2, 3, 0],
    [1, 3, 0, 2],
    [1, 3, 2, 0],
    [2, 0, 1, 3],
    [2, 0, 3, 1],
    [2, 1, 0, 3],
    [2, 1, 3, 0],
    [2, 3, 0, 1],
    [2, 3, 1, 0],
    [3, 0, 1, 2],
    [3, 0, 2, 1],
    [3, 1, 0, 2],
    [3, 1, 2, 0],
    [3, 2, 0, 1],
    [3, 2, 1, 0],
];

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

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum GridCell {
    Close = 0,
    Open = 1,
    Start = 2,
    Goal = 3,
}

#[wasm_bindgen]
pub struct Grid {
    width: u32,
    height: u32,
    start: (u32, u32),
    goal: (u32, u32),
    cells: Vec<GridCell>,
    values: Vec<i32>,
    seed: u32,
    rng: Xorshift,
}

#[wasm_bindgen]
impl Grid {
    pub fn new(width: u32, height: u32, seed: u32) -> Grid {
        let rng = Xorshift::with_seed(seed.into());
        let size = width * height;
        let cells = vec![GridCell::Close; size as usize];
        let values = vec![-1; size as usize];

        Grid {
            width,
            height,
            start: (!0, !0),
            goal: (!0, !0),
            cells,
            values,
            seed,
            rng,
        }
    }

    pub fn initialize_values(&mut self) {
        self.values = vec![-1; (self.width * self.height) as usize];
    }

    pub fn build(&mut self) {
        let (sx, sy) = (
            ((self.rng.rand((self.width / 2) as u64)) * 2 + 1) as u32,
            ((self.rng.rand((self.width / 2) as u64)) * 2 + 1) as u32,
        );
        self.cells[(sx * self.width + sy) as usize] = GridCell::Start;

        let mut stack = Vec::new();
        let mut goals = Vec::new();
        stack.push((sx, sy));

        while !stack.is_empty() {
            let (mut x, mut y) = stack.swap_remove(self.rng.rand(stack.len() as u64) as usize);

            while true {
                let mut flag = false;

                for i in SHUFFLED_DIRECTION[self.rng.rand(4) as usize] {
                    let (dx, dy) = DIJ[i];
                    let (nx, ny) = (x.wrapping_add(dx), y.wrapping_add(dy));
                    let (nnx, nny) = (nx.wrapping_add(dx), ny.wrapping_add(dy));

                    if self.check_inside(nnx, nny)
                        && self.get(nx, ny) == GridCell::Close
                        && self.get(nnx, nny) == GridCell::Close
                    {
                        self.cells[(nx * self.width + ny) as usize] = GridCell::Open;
                        self.cells[(nnx * self.width + nny) as usize] = GridCell::Open;
                        stack.push((nnx, nny));
                        (x, y) = (nnx, nny);
                        flag = true;
                        break;
                    }
                }

                if !flag {
                    let mut counter = 0;
                    for i in 0..4 {
                        let (dx, dy) = DIJ[i];
                        let (nx, ny) = (x.wrapping_add(dx), y.wrapping_add(dy));
                        if self.check_inside(nx, ny) && self.get(nx, ny) == GridCell::Open {
                            counter += 1;
                        }
                    }
                    if counter == 1 && !(x == sx && y == sy) {
                        goals.push((x, y));
                    }
                    break;
                }
            }
        }

        let (gx, gy) = goals[self.rng.rand(goals.len() as u64) as usize];
        self.cells[(gx * self.width + gy) as usize] = GridCell::Goal;
        self.start = (sx, sy);
        self.goal = (gx, gy);
    }

    pub fn bfs(&mut self) -> i32 {
        self.initialize_values();
        let (sx, sy) = self.start;
        let (gx, gy) = self.goal;
        let sid = self.get_index(sx, sy);
        let gid = self.get_index(gx, gy);

        let mut queue = VecDeque::new();
        queue.push_back((sx, sy));
        self.values[sid] = 0;

        'main: while let Some((x, y)) = queue.pop_front() {
            let cid = self.get_index(x, y);
            for i in 0..4 {
                let (dx, dy) = DIJ[i];
                let (nx, ny) = (x.wrapping_add(dx), y.wrapping_add(dy));
                let nid = self.get_index(nx, ny);

                if self.check_inside(nx, ny)
                    && self.cells[nid] == GridCell::Open
                    && self.values[nid] == -1
                {
                    self.values[nid] = self.values[cid] + 1;
                    queue.push_back((nx, ny));
                }

                if nid == gid {
                    self.values[nid] = self.values[cid] + 1;
                    break 'main;
                }
            }
        }
        self.values[gid]
    }

    pub fn aster_manhattan(&mut self) -> i32 {
        self.initialize_values();
        let (sx, sy) = self.start;
        let (gx, gy) = self.goal;
        let sid = self.get_index(sx, sy);
        let gid = self.get_index(gx, gy);

        let mut heap = BinaryHeap::new();

        let cost = self.calc_heuristics(sx, sy, gx, gy, "");
        heap.push((Reverse(cost), sx, sy));
        self.values[sid] = 0;

        'main: while let Some((_, x, y)) = heap.pop() {
            let cid = self.get_index(x, y);
            for i in 0..4 {
                let (dx, dy) = DIJ[i];
                let (nx, ny) = (x.wrapping_add(dx), y.wrapping_add(dy));
                let nid = self.get_index(nx, ny);
                let ncost = self.values[cid] + 1 + self.calc_heuristics(nx, ny, gx, gy, "");

                if self.check_inside(nx, ny)
                    && self.cells[nid] == GridCell::Open
                    && self.values[nid] == -1
                {
                    self.values[nid] = self.values[cid] + 1;
                    heap.push((Reverse(ncost), nx, ny));
                }

                if nid == gid {
                    self.values[nid] = self.values[cid] + 1;
                    break 'main;
                }
            }
        }

        self.values[gid]
    }

    pub fn calc_heuristics(&self, x0: u32, y0: u32, x1: u32, y1: u32, option: &str) -> i32 {
        if option == "manhattan" {
            return self.calc_manhattan_distance(x0, y0, x1, y1);
        } else {
            return self.calc_euclidean_distance(x0, y0, x1, y1);
        }
    }

    pub fn calc_euclidean_distance(&self, x0: u32, y0: u32, x1: u32, y1: u32) -> i32 {
        ((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1)) as i32
    }

    pub fn calc_manhattan_distance(&self, x0: u32, y0: u32, x1: u32, y1: u32) -> i32 {
        (x0.abs_diff(x1) + y0.abs_diff(y1)) as i32
    }

    pub fn check_inside(&self, row: u32, column: u32) -> bool {
        row < self.width && column < self.height
    }

    pub fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const GridCell {
        self.cells.as_ptr()
    }

    pub fn seed(&self) -> u32 {
        self.seed
    }

    pub fn get(&self, row: u32, column: u32) -> GridCell {
        self.cells[(row * self.width + column) as usize]
    }

    pub fn get_value(&self, row: u32, column: u32) -> i32 {
        self.values[self.get_index(row, column)]
    }

    pub fn get_goal_value(&self) -> i32 {
        self.values[self.get_index(self.goal.0, self.goal.1)]
    }
}
