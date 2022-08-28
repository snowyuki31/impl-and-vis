import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./style.module.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useInterval from "../../../utils/useInterval";

export type MazeState = {
  seed: number;
  size: number;
  solver: string;
};

export type ResultState = {
  length: number;
  visited: number;
};

function buildMaze(grid: Grid) {
  var elements = [];
  const size = grid.width();

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var states = [];
      let state = grid.get(i, j);
      if (state === GridCell.Close) {
        states.push("close");
      } else if (state == GridCell.Start) {
        states.push("start");
      } else if (state == GridCell.Goal) {
        states.push("goal");
      } else {
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

const Maze = ({
  state,
  result,
  setResult,
}: {
  state: MazeState;
  result: ResultState;
  setResult: Dispatch<SetStateAction<ResultState>>;
}) => {
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
      const grid = Grid.new(state.size, state.size, state.seed);
      grid.build();
      setGrid(grid);
      setMaze(buildMaze(grid));
    });
  }, [state.seed, state.size]);

  useEffect(() => {
    setIndex(0);

    if (grid) {
      grid.initialize_values();
      setMaze(buildMaze(grid));

      var ret = null;

      if (state.solver === "bfs") {
        ret = grid.bfs();
      } else if (state.solver === "dfs") {
        ret = grid.dfs();
      } else if (state.solver === "astar") {
        ret = grid.astar();
      }

      if (ret !== null) {
        setResult({ ...result, visited: 1 });
        setSteps(ret);
        setPath(grid.trace_back());
      }
    }
  }, [state.solver]);

  useInterval(() => {
    if (grid && steps && maze && path) {
      if (index < steps.length) {
        var newMaze = [...maze];
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
        var newMaze = [...maze];
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
  }, (35 * 15) / state.size);

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
