import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman, {
  TSPState,
  ResultState,
  SolverProps,
} from "../../components/modules/travelingSalesman";

import { TravelingSalesmanSolver } from "../../components/modules/travelingSalesman";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const enum InputOptions {
  numPlotsSmall = 6,
  numPlotsMedium = 18,
  numPlotsLarge = 60,
}

const TravelingSalesmanPage: NextPage = () => {
  const useProps: TravelingSalesmanSolver = {
    usePlots: useState<TSPState>({
      seed: Math.floor(Math.random() * 100),
      size: 2000,
      numPlots: InputOptions.numPlotsSmall,
    }),
    useSolver: useState<SolverProps>({
      solver: "None",
    }),
    useResult: useState<ResultState>({
      minCost: 2e9,
      calculationTime: -1,
      status: "",
    }),
  };

  return (
    <VisPage
      pagename="Traveling Salesman"
      field={Field(useProps)}
      resultArea={ResultArea(useProps)}
      generator={Generator(useProps)}
      solver={Solver(useProps)}
    ></VisPage>
  );
};

export default TravelingSalesmanPage;

export const Field = (useProps: TravelingSalesmanSolver) => {
  return <TravelingSalesman useProps={useProps} />;
};

export const ResultArea = (useProps: TravelingSalesmanSolver) => {
  const [result, setResult] = useProps.useResult;
  return (
    <>
      <div>
        Minimum Cost:{" "}
        {result.minCost !== 2e9 ? result.minCost.toFixed(2) : "inf"}
      </div>
    </>
  );
};

export const Generator = (useProps: TravelingSalesmanSolver) => {
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
              setPlots({ ...plots, seed: Number(e.target.value) });
              setSolver({ ...solver, solver: "None" });
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
                  setSolver({ ...solver, solver: "None" });
                }
              }}
              size="small"
            >
              <ToggleButton value={InputOptions.numPlotsSmall}>
                Small
              </ToggleButton>
              <ToggleButton value={InputOptions.numPlotsMedium}>
                Medium
              </ToggleButton>
              <ToggleButton value={InputOptions.numPlotsLarge}>
                Large
              </ToggleButton>
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
      orientation="vertical"
    >
      <ToggleButton value="brute-force" disabled={plots.numPlots > 10}>
        Brute Force
      </ToggleButton>
      <ToggleButton value="bitDP" disabled={plots.numPlots > 20}>
        Held-Karp (bit DP)
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
