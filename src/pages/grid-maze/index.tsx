import type { NextPage } from "next";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Layout from "../../components/templates/layout";
import Maze from "../../components/molecules/gridMaze";
import Cell from "../../components/atoms/cell";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

const GridMaze: NextPage = () => {
  const [width, setWidth] = useState(45);
  const [height, setHeight] = useState(45);
  const [seed, setSeed] = useState(44);
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
      <div>
        <div>
          Start
          <Cell states={["start", "legend"]} value={-1} />
        </div>
        <div>
          Goal
          <Cell states={["goal", "legend"]} value={-1} />
        </div>
      </div>
      <h3>Solve by</h3>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setSolver("bfs")}>
          BFS
        </Button>
        <Button variant="outlined" onClick={() => setSolver("astar_manhattan")}>
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
