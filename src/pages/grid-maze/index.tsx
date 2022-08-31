import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import Maze, {
  MazeGeneratorProps,
  MazeSolverProps,
  MazeInfoProps,
  MazeProblemProps,
} from "../../components/blocks/gridMaze";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, Button } from "@mui/material";

const GridMaze: NextPage = () => {
  const useProblem: MazeProblemProps = {
    useGenerator: useState<MazeGeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
    }),
    useSolver: useState<MazeSolverProps>({
      solver: "None",
    }),
    useInfo: useState<MazeInfoProps>({
      length: -1,
      visited: -1,
    }),
  };

  return (
    <VisPage
      pagename="Grid Maze"
      field={Field(useProblem)}
      infoArea={InfoArea(useProblem)}
      generator={Generator(useProblem)}
      solver={Solver(useProblem)}
    ></VisPage>
  );
};

export default GridMaze;

export const Field = (problemProps: MazeProblemProps) => {
  return <Maze problemProps={problemProps}></Maze>;
};

export const InfoArea = (useProblem: MazeProblemProps) => {
  const [result, setResult] = useProblem.useInfo;
  return (
    <>
      <div>Path Length: {result.length != -1 ? result.length : "-"}</div>
      <div>Visited Cells: {result.visited != -1 ? result.visited : "-"}</div>
    </>
  );
};

export const Generator = (problemProps: MazeProblemProps) => {
  const [plots, setPlots] = problemProps.useGenerator;
  const [solver, setSolver] = problemProps.useSolver;
  const [result, setResult] = problemProps.useInfo;
  return (
    <>
      <Accordion sx={{ m: 1, bgcolor: "inherit" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <TextField
            type="number"
            label="seed"
            variant="standard"
            size="small"
            value={plots.seed}
            onChange={(e) => {
              setPlots({
                ...plots,
                seed: Number(e.target.value),
              });
              setSolver({ ...solver, solver: "None" });
              setResult({ ...result, length: -1, visited: -1 });
            }}
          ></TextField>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column">
            <ToggleButtonGroup
              color="primary"
              value={plots.size}
              exclusive
              onChange={(_, newSize) => {
                if (newSize !== null) {
                  setPlots({ ...plots, size: newSize });
                  setSolver({ ...solver, solver: "None" });
                  setResult({ ...result, length: -1, visited: -1 });
                }
              }}
              size="small"
            >
              <ToggleButton value={21}>Small</ToggleButton>
              <ToggleButton value={35}>Medium</ToggleButton>
              <ToggleButton value={61}>Large</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const Solver = (problemProps: MazeProblemProps) => {
  const [solver, setSolver] = problemProps.useSolver;
  const [result, setResult] = problemProps.useInfo;
  return (
    <ToggleButtonGroup
      color="primary"
      value={solver.solver}
      exclusive
      onChange={(_, newSolver) => {
        if (newSolver !== null) {
          setSolver({ ...solver, solver: newSolver });
          setResult({ ...result, length: -1, visited: -1 });
        }
      }}
      size="medium"
    >
      <ToggleButton value="bfs">BFS</ToggleButton>
      <ToggleButton value="dfs">DFS</ToggleButton>
      <ToggleButton value="astar">A*</ToggleButton>
    </ToggleButtonGroup>
  );
};
