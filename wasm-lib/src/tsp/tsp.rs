use crate::utils::xorshift::Xorshift;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Graph {
    num_plots: u32,
    size: u32,
    nodes: Vec<u32>,
    seed: u32,
    rng: Xorshift,
}

#[wasm_bindgen]
impl Graph {
    pub fn new(num_plots: u32, seed: u32, size: u32) -> Graph {
        let rng = Xorshift::with_seed(seed.into());
        let nodes = Vec::new();

        Graph {
            num_plots,
            size,
            nodes,
            seed,
            rng,
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

    pub fn seed(&self) -> u32 {
        self.seed
    }
}
