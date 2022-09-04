import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman from "../../components/modules/travelingSalesman";
import SolverArea from "../../components/blocks/solverArea";
import InfoArea from "../../components/blocks/infoArea";
import { CanvasArea } from "../../components/blocks/canvasArea";

import {
  SolverOptions,
  SizeOptions,
  GeneratorProps,
  SolverProps,
  InfoProps,
  defaultInfo,
  StateHooks,
} from "../../types/travelingSalesman";

import ToggleButton from "@mui/material/ToggleButton";
import GeneratorArea from "../../components/blocks/generatorArea";

const TravelingSalesmanPage: NextPage = () => {
  const hooks: StateHooks = {
    useGenerator: useState<GeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: SizeOptions.Large,
    }),
    useSolver: useState<SolverProps>({
      solver: null,
    }),
    useInfo: useState<InfoProps>(defaultInfo),
  };

  return (
    <VisPage
      pagename="Traveling Salesman"
      field={Field(hooks)}
      infoArea={Info(hooks)}
      generator={Generator(hooks)}
      solver={Solver(hooks)}
    ></VisPage>
  );
};

export default TravelingSalesmanPage;

export const Field = (hooks: StateHooks) => {
  const field = <TravelingSalesman hooks={hooks}></TravelingSalesman>;
  return <CanvasArea hooks={hooks} field={field}></CanvasArea>;
};

export const Info = (hooks: StateHooks) => {
  const [generator, setGenerator] = hooks.useGenerator;
  const [result, setResult] = hooks.useInfo;

  const inputInfo = <div>n={generator.size}</div>;
  const outputInfo = (
    <div>
      Minimum Cost: {result.minCost ? result.minCost.toFixed(2) : "inf"}
      {result.optimal === null ? "" : " (" + result.optimal + ")"}
    </div>
  );
  const isWarning = generator.size > 300 && result.calculationTime === null;

  return InfoArea({ hooks, inputInfo, outputInfo, isWarning });
};

export const Generator = (hooks: StateHooks) => {
  const ToggleButtons = [
    <ToggleButton key={"small"} value={SizeOptions.Small}>
      Small
    </ToggleButton>,
    <ToggleButton key={"medium"} value={SizeOptions.Medium}>
      Medium
    </ToggleButton>,
    <ToggleButton key={"large"} value={SizeOptions.Large}>
      Large
    </ToggleButton>,
    <ToggleButton key={"extreme"} value={SizeOptions.Extreme}>
      Extreme
    </ToggleButton>,
  ];
  return GeneratorArea<StateHooks, InfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};

export const Solver = (hooks: StateHooks) => {
  const [generator, setGenerator] = hooks.useGenerator;

  const ToggleButtons = [
    <ToggleButton
      key={SolverOptions.BF}
      value={SolverOptions.BF}
      disabled={generator.size > 12}
    >
      {SolverOptions.BF}
    </ToggleButton>,
    <ToggleButton
      key={SolverOptions.DP}
      value={SolverOptions.DP}
      disabled={generator.size > 20}
    >
      {SolverOptions.DP}
    </ToggleButton>,
    <ToggleButton key={SolverOptions.NN} value={SolverOptions.NN}>
      {SolverOptions.NN}
    </ToggleButton>,
    <ToggleButton key={SolverOptions.TwoOpt} value={SolverOptions.TwoOpt}>
      {SolverOptions.TwoOpt}
    </ToggleButton>,
    <ToggleButton key={SolverOptions.ILS} value={SolverOptions.ILS}>
      {SolverOptions.ILS}
    </ToggleButton>,
  ];

  return SolverArea<StateHooks, InfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons,
    "vertical"
  );
};
