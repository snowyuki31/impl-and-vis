import type { NextPage } from "next";
import { useState, Dispatch, SetStateAction } from "react";
import Layout from "../../components/templates/layout";
import Maze from "../../components/molecules/gridMaze";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const GridMaze: NextPage = () => {
  const [width, setWidth] = useState(35);
  const [height, setHeight] = useState(35);
  const [seed, setSeed] = useState(42);
  const [solver, setSolver] = useState("None");

  return (
    <Layout pagename="Grid Maze">
      <h1>Grid Maze</h1>

      <Stack direction="row" spacing={2} sx={{ m: 1 }}>
        <TextField
          type="number"
          label="seed"
          variant="standard"
          size="small"
          value={seed}
          onChange={(e) => {
            handleChange(e, setSeed);
            setSolver("None");
          }}
        ></TextField>

        <ToggleButtonGroup
          color="primary"
          value={width}
          exclusive
          onChange={(event, newSize) => {
            if (newSize !== null) {
              setWidth(newSize);
              setHeight(newSize);
            }
          }}
          size="small"
        >
          <ToggleButton value={21}>Small</ToggleButton>
          <ToggleButton value={35}>Medium</ToggleButton>
          <ToggleButton value={59}>Large</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Maze width={width} height={height} seed={seed} solver={solver}></Maze>
      <h3>Solve by</h3>

      <ToggleButtonGroup
        color="primary"
        value={solver}
        exclusive
        onChange={(event, newSolver) => {
          if (newSolver !== null) setSolver(newSolver);
        }}
        size="medium"
      >
        <ToggleButton value="bfs">BFS</ToggleButton>
        <ToggleButton value="dfs">DFS</ToggleButton>
        <ToggleButton value="astar">A*</ToggleButton>
      </ToggleButtonGroup>
    </Layout>
  );
};

export default GridMaze;

const handleChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  f: Dispatch<SetStateAction<number>>
) => {
  f(() => Number(e.target.value));
};
