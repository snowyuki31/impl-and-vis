import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman, {
  TSPGeneratorProps,
  TSPInfoProps,
  TSPSolverProps,
  TSPHooks,
} from "../../components/modules/travelingSalesman";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const enum InputOptions {
  numPlotsSmall = 10,
  numPlotsMedium = 17,
  numPlotsLarge = 100,
  numPlotsExtreme = 500,
}

const TravelingSalesmanPage: NextPage = () => {
  const hooks: TSPHooks = {
    useGenerator: useState<TSPGeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: InputOptions.numPlotsSmall,
    }),
    useSolver: useState<TSPSolverProps>({
      solver: "None",
    }),
    useInfo: useState<TSPInfoProps>({
      minCost: 2e9,
      calculationTime: -1,
      status: "",
      optimal: null,
    }),
  };

  return (
    <VisPage
      pagename="Traveling Salesman"
      field={Field(hooks)}
      infoArea={InfoArea(hooks)}
      generator={Generator(hooks)}
      solver={Solver(hooks)}
    ></VisPage>
  );
};

export default TravelingSalesmanPage;

export const Field = (hooks: TSPHooks) => {
  return <TravelingSalesman hooks={hooks} />;
};

export const InfoArea = (hooks: TSPHooks) => {
  const [plots, setPlots] = hooks.useGenerator;
  const [result, setResult] = hooks.useInfo;
  return (
    <>
      <div>n={plots.size}</div>
      <div>{result.status}</div>
      <div>
        Minimum Cost:{" "}
        {result.minCost !== 2e9 ? result.minCost.toFixed(2) : "inf"}
        {result.optimal === null ? "" : " (" + result.optimal + ")"}
      </div>
      <div style={{ color: "#C84B31" }}>
        {plots.size > 300 && result.status === null
          ? "Calculation may take a while."
          : ""}
      </div>
    </>
  );
};

export const Generator = (hooks: TSPHooks) => {
  const [plots, setPlots] = hooks.useGenerator;
  const [solver, setSolver] = hooks.useSolver;
  const [result, setResult] = hooks.useInfo;
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
              value={plots.size}
              onChange={(_, newNumPlots) => {
                if (newNumPlots !== null) {
                  setPlots({ ...plots, size: newNumPlots });
                  setSolver({ ...solver, solver: "None" });
                }
              }}
              size="small"
              orientation="vertical"
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
              <ToggleButton value={InputOptions.numPlotsExtreme}>
                Extreme
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const Solver = (hooks: TSPHooks) => {
  const [plots, setPlots] = hooks.useGenerator;
  const [solver, setSolver] = hooks.useSolver;
  const [result, setResult] = hooks.useInfo;
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
      <ToggleButton value="brute-force" disabled={plots.size > 12}>
        Brute Force
      </ToggleButton>
      <ToggleButton value="bitDP" disabled={plots.size > 20}>
        Held-Karp
      </ToggleButton>
      <ToggleButton value="nn">Nearest Neighbor</ToggleButton>
      <ToggleButton value="nn-2opt">NN + 2-opt</ToggleButton>
    </ToggleButtonGroup>
  );
};
