import type { NextPage } from "next";
import { useState, useContext, Dispatch, SetStateAction } from "react";
import VisPage from "../../components/templates/visPage";
import Maze from "../../components/blocks/gridMaze";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";

type MazeState = {
  seed: number;
  size: number;
  solver: string;
};

const GridMaze: NextPage = () => {
  const [state, setState] = useState<MazeState>({
    seed: Math.floor(Math.random() * 100),
    size: 35,
    solver: "None",
  });

  return (
    <VisPage
      pagename="GirdMaze"
      field={Field(state)}
      generator={Generator(state, setState)}
      solver={Solver(state, setState)}
    ></VisPage>
  );
};

export default GridMaze;

export const Field = (state: MazeState) => {
  return (
    <Maze size={state.size} seed={state.seed} solver={state.solver}></Maze>
  );
};

export const Generator = (
  state: MazeState,
  setState: Dispatch<SetStateAction<MazeState>>
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
  setState: Dispatch<SetStateAction<MazeState>>
) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={state.solver}
      exclusive
      onChange={(_, newSolver) => {
        if (newSolver !== null) setState({ ...state, solver: newSolver });
      }}
      size="medium"
    >
      <ToggleButton value="bfs">BFS</ToggleButton>
      <ToggleButton value="dfs">DFS</ToggleButton>
      <ToggleButton value="astar">A*</ToggleButton>
    </ToggleButtonGroup>
  );
};
