import type { NextPage } from "next";
import { useState, Dispatch, SetStateAction } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman, {
  ResultState,
  SolverProps,
} from "../../components/modules/travelingSalesman";

import { PlotAreaProps } from "../../components/blocks/plotArea";
import { TravelingSalesmanSolver } from "../../components/modules/travelingSalesman";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const TravelingSalesmanPage: NextPage = () => {
  const useProps: TravelingSalesmanSolver = {
    usePlots: useState<PlotAreaProps>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
      numPlots: 35,
    }),
    useSolver: useState<SolverProps>({
      solver: "None",
    }),
    useResult: useState<ResultState>({
      minCost: -1,
    }),
  };

  return (
    <VisPage
      pagename="Traveling Salesman (WIP)"
      field={<></>}
      resultArea={ResultArea(useProps)}
      generator={Generator(useProps)}
      solver={Solver(useProps)}
    ></VisPage>
  );
};

export default TravelingSalesmanPage;

export const Field = () => {
  return <TravelingSalesman />;
};

export const ResultArea = (useProps: TravelingSalesmanSolver) => {
  const [result, setResult] = useProps.useResult;
  return (
    <>
      <div>Minimum Cost: {result.minCost != -1 ? result.minCost : "inf"}</div>
    </>
  );
};

export const Generator = (useProps: TravelingSalesmanSolver) => {
  const [plots, setPlots] = useProps.usePlots;
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
              setPlots({ ...plots, seed: Number(e.target.value) });
            }}
          ></TextField>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column">
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={plots.numPlots}
              onChange={(_, newNumPlots) => {
                if (newNumPlots !== null) {
                  setPlots({ ...plots, numPlots: newNumPlots });
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

export const Solver = (useProps: TravelingSalesmanSolver) => {
  const [plots, setPlots] = useProps.usePlots;
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
        }
      }}
      size="medium"
    >
      <ToggleButton value="brute-force">Brute Force</ToggleButton>
    </ToggleButtonGroup>
  );
};
