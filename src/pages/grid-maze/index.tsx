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
  const [seed, setSeed] = useState(42);

  return (
    <Layout>
      <h1>Grid Maze</h1>
      <TextField
        type="number"
        label="seed"
        variant="standard"
        size="small"
        value={seed}
        onChange={(e) => handleChange(e, setSeed)}
      ></TextField>
      <Maze width={width} height={height} seed={seed}></Maze>
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
        <Button variant="outlined">BFS</Button>
        <Button variant="outlined">A*</Button>
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