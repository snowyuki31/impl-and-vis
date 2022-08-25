use crate::utils::xorshift::Xorshift;
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
    cells: Vec<GridCell>,
    values: Vec<u32>,
    seed: u32,
    rng: Xorshift,
}

#[wasm_bindgen]
impl Grid {
    pub fn new(width: u32, height: u32, seed: u32) -> Grid {
        let rng = Xorshift::with_seed(seed.into());
        let size = width * height;
        let cells = vec![GridCell::Close; size as usize];
        let values = vec![0; size as usize];

        Grid {
            width,
            height,
            cells,
            values,
            seed,
            rng,
        }
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
    }

    pub fn check_inside(&self, row: u32, column: u32) -> bool {
        return row < self.width && column < self.height;
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
}
