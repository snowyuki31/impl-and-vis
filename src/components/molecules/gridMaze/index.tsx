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

  useEffect(() => {
    init().then(() => {
      const grid = Grid.new(props.width, props.height, props.seed);
      grid.build();
      setGrid(grid);
      setMinDist(-1);
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
    });
  }, [props.seed]);

  useEffect(() => {
    if (grid && props.solver === "bfs") {
      const result = grid.bfs();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      setMinDist(grid.get_goal_value());
      console.log("BFS Done!");
    } else if (grid && props.solver === "astar_manhattan") {
      const result = grid.astar();
      setMaze(buildMaze(grid, grid?.width(), grid?.height()));
      setMinDist(grid.get_goal_value());
      console.log("A* Done!");
    }
  }, [props.solver]);

  return (
    <>
      <div>{maze}</div>
      <div>Minimum Distance: {minDist != -1 ? minDist : "-"}</div>
    </>
  );
};

export default Maze;
