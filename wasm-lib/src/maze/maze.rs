use wasm_bindgen::prelude::*;

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
    seed: u32,
}

#[wasm_bindgen]
impl Grid {
    pub fn new(width: u32, height: u32, seed: u32) -> Grid {
        let size = width * height;
        let mut cells = vec![GridCell::Close; size as usize];

        let mut start = ((seed % size) + 15) % size;
        let mut goal = ((seed % size) + 87) % size;
        if start % 2 == 0 {
            start += 1;
        }
        if goal % 2 == 0 {
            goal += 1;
        }

        cells[start as usize] = GridCell::Start;
        cells[goal as usize] = GridCell::Goal;

        Grid {
            width,
            height,
            cells,
            seed,
        }
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

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }
}
