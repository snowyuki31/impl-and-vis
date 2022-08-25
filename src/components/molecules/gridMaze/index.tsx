import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
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
    var row = [];
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

      row.push(<Cell states={states} value={i * width + j}></Cell>);
    }
    elements.push(<div className={styles.row}>{row}</div>);
  }
  return elements;
}

const Maze: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState<Grid>();
  const [maze, setMaze] = useState<JSX.Element[]>();
  const [minDist, setMinDist] = useState(-1);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    init().then(() => {
      const grid = Grid.new(props.width, props.height, props.seed);
      grid.build();
      setGrid(grid);
      setMinDist(-1);
      setStep(-1);
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
    });
  }, [props.seed, props.width, props.height]);

  useEffect(() => {
    if (grid && props.solver === "bfs") {
      const step = grid.bfs();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      setMinDist(grid.get_goal_value());
      setStep(step);

      console.log("BFS Done!");
    } else if (grid && props.solver === "astar_manhattan") {
      const step = grid.astar();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      setMinDist(grid.get_goal_value());
      setStep(step);

      console.log("A* Done!");
    }
  }, [props.solver]);

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
        <div>Calculation Steps: {step != -1 ? step : "-"}</div>
      </div>
    </div>
  );
};

export default Maze;
