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

      elements.push(
        <Cell states={states} value={i * width + j} width={grid.width()}></Cell>
      );
    }
  }
  return elements;
}

const Maze: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState<Grid>();
  const [maze, setMaze] = useState<JSX.Element[]>();
  const [minDist, setMinDist] = useState(-1);
  const [iter, setIter] = useState(-1);
  const [steps, setSteps] = useState<Uint32Array | null>();
  const [path, setPath] = useState<Uint32Array | null>();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    init().then(() => {
      const grid = Grid.new(props.width, props.height, props.seed);
      grid.build();
      setGrid(grid);
      setMinDist(-1);
      setIter(-1);
      setSteps(null);
      setPath(null);
      setIdx(0);
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
    });
  }, [props.seed, props.width, props.height]);

  useEffect(() => {
    setIdx(0);
    setMinDist(-1);
    setIter(1);

    if (grid) {
      grid.initialize_values();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));

      if (props.solver === "bfs") {
        const result = grid.bfs();
        setSteps(result);
        setPath(grid.trace_back());
        console.log("BFS Done!");
      } else if (props.solver === "dfs") {
        const result = grid.dfs();
        setSteps(result);
        setPath(grid.trace_back());
        console.log("DFS Done!");
      } else if (props.solver === "astar") {
        const result = grid.astar();
        setSteps(result);
        setPath(grid.trace_back());
        console.log("A* Done!");
      }
    }
  }, [props.solver]);

  useInterval(() => {
    if (grid && steps && maze && path) {
      if (idx < steps.length) {
        var newMaze = [...maze];
        newMaze[steps[idx]] = (
          <Cell
            states={["open", "visited"]}
            value={steps[idx]}
            width={grid.width()}
          ></Cell>
        );
        setMaze(newMaze);
        setIdx(idx + 1);
        setIter(iter + 1);
      } else if (idx >= steps.length && idx < steps.length + path.length) {
        setMinDist(2 + idx - steps.length);
        var newMaze = [...maze];
        newMaze[path[idx - steps.length]] = (
          <Cell
            states={["open", "on_path"]}
            value={steps[idx]}
            width={grid.width()}
          ></Cell>
        );
        setMaze(newMaze);
        setIdx(idx + 1);
      }
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.maze}>{maze}</div>
      <div className={styles.legend}>
        <div>
          Start
          <Cell states={["start", "legend"]} value={-1} width={35} />
        </div>
        <div>
          Goal
          <Cell states={["goal", "legend"]} value={-1} width={35} />
        </div>
      </div>
      <div className={styles.result}>
        <div>Distance: {minDist != -1 ? minDist : "-"}</div>
        <div>Visited Cells: {iter != -1 ? iter : "-"}</div>
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
