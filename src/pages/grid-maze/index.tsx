import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import Maze, {
  MazeState,
  ResultState,
  SolverProps,
  GridMazeSolver,
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
  const useProps: GridMazeSolver = {
    usePlots: useState<MazeState>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
    }),
    useSolver: useState<SolverProps>({
      solver: "None",
    }),
    useResult: useState<ResultState>({
      length: -1,
      visited: -1,
    }),
  };

  return (
    <VisPage
      pagename="Grid Maze"
      field={Field(useProps)}
      infoArea={InfoArea(useProps)}
      generator={Generator(useProps)}
      solver={Solver(useProps)}
    ></VisPage>
  );
};

export default GridMaze;

export const Field = (useProps: GridMazeSolver) => {
  return <Maze useProps={useProps}></Maze>;
};

export const InfoArea = (useProps: GridMazeSolver) => {
  const [result, setResult] = useProps.useResult;
  return (
    <>
      <div>Path Length: {result.length != -1 ? result.length : "-"}</div>
      <div>Visited Cells: {result.visited != -1 ? result.visited : "-"}</div>
    </>
  );
};

export const Generator = (useProps: GridMazeSolver) => {
  const [plots, setPlots] = useProps.usePlots;
  const [solver, setSolver] = useProps.useSolver;
  const [result, setResult] = useProps.useResult;
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

// export const Solver = (useProps: GridMazeSolver) => {
//   const [solver, setSolver] = useProps.useSolver;
//   const [result, setResult] = useProps.useResult;

//   return (
//     <>
//       <Accordion sx={{ mt: 1, bgcolor: "inherit" }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>BFS</AccordionSummary>
//         <AccordionDetails>
//           <Button
//             onClick={(e) => {
//               setSolver({ ...solver, solver: "bfs" });
//             }}
//             disabled={solver.solver === "bfs"}
//           >
//             RUN
//           </Button>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion sx={{ bgcolor: "inherit" }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>DFS</AccordionSummary>
//         <AccordionDetails>
//           <Button
//             onClick={(e) => {
//               setSolver({ ...solver, solver: "dfs" });
//             }}
//             disabled={solver.solver === "dfs"}
//           >
//             RUN
//           </Button>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion sx={{ bgcolor: "inherit" }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>A*</AccordionSummary>
//         <AccordionDetails>
//           <Button
//             onClick={(e) => {
//               setSolver({ ...solver, solver: "astar" });
//             }}
//             disabled={solver.solver === "astar"}
//           >
//             RUN
//           </Button>
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// };

export const Solver = (useProps: GridMazeSolver) => {
  const [solver, setSolver] = useProps.useSolver;
  const [result, setResult] = useProps.useResult;
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
