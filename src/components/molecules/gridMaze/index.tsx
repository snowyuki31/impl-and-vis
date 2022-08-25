import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";

type Props = {
  width: number;
  height: number;
  seed: number;
  solver: string;
};

function buildMaze(grid: Grid, width: number, height: number) {
  var elements = [];

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
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

      elements.push(<Cell states={states} value={i * width + j}></Cell>);
    }
  }
  return elements;
}

function visitCell(maze: JSX.Element[], index: number) {
  var states = ["open", "visited"];
  maze[index] = <Cell states={states} value={index}></Cell>;
}

const Maze: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState<Grid>();
  const [maze, setMaze] = useState<JSX.Element[]>();
  const [minDist, setMinDist] = useState(-1);
  const [iter, setIter] = useState(-1);
  const [steps, setSteps] = useState<Uint32Array | null>();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    init().then(() => {
      const grid = Grid.new(props.width, props.height, props.seed);
      grid.build();
      setGrid(grid);
      setMinDist(-1);
      setIter(-1);
      setSteps(null);
      setIdx(0);
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
    });
  }, [props.seed, props.width, props.height]);

  useEffect(() => {
    setIdx(0);
    setMinDist(-1);
    setIter(-1);

    if (grid && props.solver === "bfs") {
      grid.initialize_values();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      const result = grid.bfs();
      setSteps(result);
      console.log("BFS Done!");
    } else if (grid && props.solver === "dfs") {
      grid.initialize_values();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      const result = grid.dfs();
      setSteps(result);
      console.log("DFS Done!");
    } else if (grid && props.solver === "astar") {
      grid.initialize_values();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      const result = grid.astar();
      setSteps(result);
      console.log("A* Done!");
    }
  }, [props.solver]);

  useInterval(() => {
    if (steps && maze && idx < steps.length) {
      var newMaze = [...maze];
      newMaze[steps[idx]] = (
        <Cell states={["open", "visited"]} value={steps[idx]}></Cell>
      );
      setMaze(newMaze);
      setIdx(idx + 1);
    } else if (grid && steps && idx >= steps.length) {
      setMinDist(grid.get_goal_value());
      setIter(steps.length + 2);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.maze}>{maze}</div>
      <div className={styles.legend}>
        <div>
          Start
          <Cell states={["start", "legend"]} value={-1} />
        </div>
        <div>
          Goal
          <Cell states={["goal", "legend"]} value={-1} />
        </div>
      </div>
      <div className={styles.result}>
        <div>Minimum Distance: {minDist != -1 ? minDist : "-"}</div>
        <div>Visited Cell Counts: {iter != -1 ? iter : "-"}</div>
      </div>
    </div>
  );
};

export default Maze;

export const useInterval = (callback: () => void) => {
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    const id = setInterval(tick, 15);
    return () => {
      clearInterval(id);
    };
  });
};
