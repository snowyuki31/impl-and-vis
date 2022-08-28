import type { NextPage } from "next";
import { useState, Dispatch, SetStateAction } from "react";

import VisPage from "../../components/templates/visPage";
import Maze, { MazeState, ResultState } from "../../components/blocks/gridMaze";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";

const GridMaze: NextPage = () => {
  const [state, setState] = useState<MazeState>({
    seed: Math.floor(Math.random() * 100),
    size: 35,
    solver: "None",
  });

  const [result, setResult] = useState<ResultState>({
    distance: -1,
    visited: -1,
  });

  return (
    <VisPage
      pagename="Grid Maze"
      field={Field({ state, result, setResult })}
      resultArea={ResultArea(result)}
      generator={Generator(state, setState, result, setResult)}
      solver={Solver(state, setState, result, setResult)}
    ></VisPage>
  );
};

export default GridMaze;

export const Field = ({
  state,
  result,
  setResult,
}: {
  state: MazeState;
  result: ResultState;
  setResult: Dispatch<SetStateAction<ResultState>>;
}) => {
  return <Maze state={state} result={result} setResult={setResult}></Maze>;
};

export const ResultArea = (result: ResultState) => {
  return (
    <>
      <div>Distance: {result.distance != -1 ? result.distance : "-"}</div>
      <div>Visited Cells: {result.visited != -1 ? result.visited : "-"}</div>
    </>
  );
};

export const Generator = (
  state: MazeState,
  setState: Dispatch<SetStateAction<MazeState>>,
  result: ResultState,
  setResult: Dispatch<SetStateAction<ResultState>>
) => {
  const { seed, size } = state;
  return (
    <>
      <Accordion sx={{ m: 1, bgcolor: "inherit" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <TextField
            type="number"
            label="seed"
            variant="standard"
            size="small"
            value={seed}
            onChange={(e) => {
              setState({
                ...state,
                seed: Number(e.target.value),
                solver: "None",
              });
              setResult({ ...result, distance: -1, visited: -1 });
            }}
          ></TextField>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column">
            <ToggleButtonGroup
              color="primary"
              value={size}
              exclusive
              onChange={(_, newSize) => {
                if (newSize !== null) {
                  setState({ ...state, size: newSize, solver: "None" });
                  setResult({ ...result, distance: -1, visited: -1 });
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

export const Solver = (
  state: MazeState,
  setState: Dispatch<SetStateAction<MazeState>>,
  result: ResultState,
  setResult: Dispatch<SetStateAction<ResultState>>
) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={state.solver}
      exclusive
      onChange={(_, newSolver) => {
        if (newSolver !== null) {
          setState({ ...state, solver: newSolver });
          setResult({ ...result, distance: -1, visited: -1 });
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
