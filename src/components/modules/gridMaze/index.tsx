import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Box from "@mui/material/Box";

import useInterval from "../../../utils/useInterval";

import { StateHooks, SolverOptions } from "../../../models/gridMaze";

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
  const { size, seed } = hooks.useGenerator[0];
  const { solver } = hooks.useSolver[0];
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
      const grid = Grid.new(size, size, seed);
      grid.build();
      setGrid(grid);
      setMaze(buildMaze(grid));
    });
  }, [size, seed]);

  useEffect(() => {
    setIndex(0);

    if (grid && solver !== null) {
      grid.initialize_values();
      setMaze(buildMaze(grid));

      let startTime = performance.now();
      let ret = null;
      switch (solver) {
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
      let endTime = performance.now();

      console.log(endTime - startTime);

      setResult({
        ...result,
        visited: 1,
        calculationTime: endTime - startTime,
      });
      setSteps(ret);
      setPath(grid.trace_back());
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

        setResult({
          ...result,
          visited: result.visited + 1,
          progress: (index * 100) / (steps.length + path.length),
        });
        setMaze(newMaze);
        setIndex(index + 1);
      } else if (index >= steps.length && index < steps.length + path.length) {
        let newMaze = [...maze];
        newMaze[path[index - steps.length]] = (
          <Cell
            states={["open", "on_path"]}
            value={steps[index]}
            width={grid.width()}
          ></Cell>
        );

        setResult({
          ...result,
          length: 2 + index - steps.length,
          progress: (index * 100) / (steps.length + path.length),
        });
        setMaze(newMaze);
        setIndex(index + 1);
      }
    }
  }, (35 * 15) / size);

  return (
    <Box
      sx={{ height: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" } }}
      className={styles.maze}
    >
      {maze}
    </Box>
  );
};

export default Maze;
