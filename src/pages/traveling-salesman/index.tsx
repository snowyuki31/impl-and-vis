import type { NextPage } from "next";
import { useState, Dispatch, SetStateAction } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman, {
  ResultState,
  SolverProps,
} from "../../components/modules/travelingSalesman";

import { PlotAreaProps } from "../../components/blocks/plotArea";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type TravelingSalesmanProps = {
  plots: PlotAreaProps;
  solver: SolverProps;
  result: ResultState;
};

const TravelingSalesmanPage: NextPage = () => {
  const useProps = useState<TravelingSalesmanProps>({
    plots: {
      seed: Math.floor(Math.random() * 100),
      size: 35,
      numPlots: 35,
    },
    solver: {
      solver: "None",
    },
    result: {
      minCost: -1,
    },
  });

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

export const ResultArea = (
  useProps: [TravelingSalesmanProps, Dispatch<TravelingSalesmanProps>]
) => {
  const [props, setProps] = useProps;
  return (
    <>
      <div>
        Minimum Cost:{" "}
        {props.result.minCost != -1 ? props.result.minCost : "inf"}
      </div>
    </>
  );
};

export const Generator = (
  useProps: [TravelingSalesmanProps, Dispatch<TravelingSalesmanProps>]
) => {
  const [props, setProps] = useProps;
  return (
    <>
      <Accordion sx={{ m: 1, bgcolor: "inherit" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <TextField
            type="number"
            label="seed"
            variant="standard"
            size="small"
            value={props.plots.seed}
            onChange={(e) => {
              setProps({
                ...props,
                plots: {
                  ...props.plots,
                  seed: Number(e.target.value),
                },
              });
            }}
          ></TextField>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column">
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={props.plots.numPlots}
              onChange={(_, newNumPlots) => {
                if (newNumPlots !== null) {
                  setProps({
                    ...props,
                    plots: { ...props.plots, numPlots: newNumPlots },
                  });
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
  useProps: [TravelingSalesmanProps, Dispatch<TravelingSalesmanProps>]
) => {
  const [props, setProps] = useProps;
  return (
    <ToggleButtonGroup
      color="primary"
      value={props.solver.solver}
      exclusive
      onChange={(_, newSolver) => {
        if (newSolver !== null) {
          setProps({
            ...props,
            solver: { ...props.solver, solver: newSolver },
          });
        }
      }}
      size="medium"
    >
      <ToggleButton value="brute-force">Brute Force</ToggleButton>
    </ToggleButtonGroup>
  );
};
