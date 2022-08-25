import type { NextPage } from "next";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Layout from "../../components/templates/layout";
import Maze from "../../components/molecules/gridMaze";
import Cell from "../../components/atoms/cell";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const GridMaze: NextPage = () => {
  const [width, setWidth] = useState(35);
  const [height, setHeight] = useState(35);
  const [seed, setSeed] = useState(42);
  const [solver, setSolver] = useState("None");

  return (
    <Layout>
      <h1>Grid Maze</h1>
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
      <Maze width={width} height={height} seed={seed} solver={solver}></Maze>
      <h3>Solve by</h3>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setSolver("bfs")}>
          BFS
        </Button>
        <Button variant="outlined" onClick={() => setSolver("dfs")}>
          DFS
        </Button>
        <Button variant="outlined" onClick={() => setSolver("astar")}>
          A*
        </Button>
      </Stack>
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
