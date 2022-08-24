import Cell from "../../atoms/cell";
import init, { Grid, GridCell } from "wasm-lib";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Props = {
  width: number;
  height: number;
  seed: number;
};

function buildMaze(grid: Grid) {
  var elements = [];

  for (var i = 0; i < grid.width(); i++) {
    for (var j = 0; j < grid.height(); j++) {
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

      elements.push(<Cell states={states} value={i * grid.width() + j}></Cell>);
    }
    elements.push(<div></div>);
  }
  return elements;
}

const Maze: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState<JSX.Element[]>();

  useEffect(() => {
    init().then(() => {
      setGrid(buildMaze(Grid.new(props.width, props.height, props.seed)));
    });
  }, [props.seed]);

  return <div>{grid}</div>;
};

export default Maze;
