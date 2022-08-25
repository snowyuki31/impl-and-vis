import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { memory } from "wasm-lib/wasm_lib_bg.wasm";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./style.module.css";

type Props = {
  width: number;
  height: number;
  seed: number;
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

      row.push(<Cell states={states} value={i * width + j}></Cell>);
    }
    elements.push(<div className={styles.row}>{row}</div>);
  }
  return elements;
}

const Maze: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState<JSX.Element[]>();

  useEffect(() => {
    init().then(() => {
      const grid = Grid.new(props.width, props.height, props.seed);
      grid.build();
      // const cellsPtr = grid.cells();
      // const cells = new Uint8Array(
      //   memory.buffer,
      //   cellsPtr,
      //   grid.width() * grid.height()
      // );
      setGrid(buildMaze(grid, grid.width(), grid.height()));
    });
  }, [props.seed]);

  return <div>{grid}</div>;
};

export default Maze;
