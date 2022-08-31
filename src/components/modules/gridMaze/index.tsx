import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useInterval from "../../../utils/useInterval";

import { StateHooks, SolverOptions } from "../../../types/gridMaze";

function buildMaze(grid: Grid) {
  let elements = [];
  const size = grid.width();

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let states = [];
      let state = grid.get(i, j);

      switch (grid.get(i, j)) {
        case GridCell.Close:
          states.push("close");
          break;
        case GridCell.Start:
          states.push("start");
          break;
        case GridCell.Goal:
          states.push("goal");
          break;
        default:
          states.push("open");
      }

      if (grid.get_value(i, j) != -1 && state == GridCell.Open) {
        states.push("visited");
      }

      elements.push(
        <Cell states={states} value={i * size + j} width={size}></Cell>
      );
    }
  }
  return elements;
}

const Maze = ({ hooks }: { hooks: StateHooks }) => {
  const [plots, setPlots] = hooks.useGenerator;
  const [solver, setSolver] = hooks.useSolver;
  const [result, setResult] = hooks.useInfo;

  const [grid, setGrid] = useState<Grid>();
  const [maze, setMaze] = useState<JSX.Element[]>();
  const [steps, setSteps] = useState<Uint32Array | null>();
  const [path, setPath] = useState<Uint32Array | null>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setPath(null);
    setSteps(null);
    setIndex(0);

    init().then(() => {
      const grid = Grid.new(plots.size, plots.size, plots.seed);
      grid.build();
      setGrid(grid);
      setMaze(buildMaze(grid));
    });
  }, [plots]);

  useEffect(() => {
    setIndex(0);

    if (grid) {
      grid.initialize_values();
      setMaze(buildMaze(grid));

      let ret;
      switch (solver.solver) {
        case SolverOptions.BFS:
          ret = grid.bfs();
          break;
        case SolverOptions.DFS:
          ret = grid.dfs();
          break;
        case SolverOptions.AStar:
          ret = grid.astar();
          break;
      }

      if (ret !== null) {
        setResult({ ...result, visited: 1 });
        setSteps(ret);
        setPath(grid.trace_back());
      }
    }
  }, [solver]);

  useInterval(() => {
    if (grid && steps && maze && path && typeof result.visited == "number") {
      if (index < steps.length) {
        let newMaze = [...maze];
        newMaze[steps[index]] = (
          <Cell
            states={["open", "visited"]}
            value={steps[index]}
            width={grid.width()}
          ></Cell>
        );

        setMaze(newMaze);
        setIndex(index + 1);
        setResult({ ...result, visited: result.visited + 1 });
      } else if (index >= steps.length && index < steps.length + path.length) {
        let newMaze = [...maze];
        newMaze[path[index - steps.length]] = (
          <Cell
            states={["open", "on_path"]}
            value={steps[index]}
            width={grid.width()}
          ></Cell>
        );

        setMaze(newMaze);
        setIndex(index + 1);
        setResult({ ...result, length: 2 + index - steps.length });
      }
    }
  }, (35 * 15) / plots.size);

  return (
    <>
      <Box
        sx={{ height: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" } }}
        className={styles.maze}
      >
        {maze}
      </Box>
      <Stack direction="row" justifyContent="center" spacing={5} sx={{ mt: 1 }}>
        <Stack direction="row" justifyContent="center">
          <Cell states={["start"]} value={-1} width={-1} />
          Start
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Cell states={["goal"]} value={-1} width={-1} />
          Goal
        </Stack>
      </Stack>
    </>
  );
};

export default Maze;
