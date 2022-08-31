import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman from "../../components/modules/travelingSalesman";
import SolverArea from "../../components/blocks/solverArea";

import {
  SolverOptions,
  SizeOptions,
  GeneratorProps,
  SolverProps,
  InfoProps,
  StateHooks,
} from "../../types/travelingSalesman";

import ToggleButton from "@mui/material/ToggleButton";
import GeneratorArea from "../../components/blocks/generatorArea";

const TravelingSalesmanPage: NextPage = () => {
  const hooks: StateHooks = {
    useGenerator: useState<GeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: SizeOptions.Small,
    }),
    useSolver: useState<SolverProps>({
      solver: null,
    }),
    useInfo: useState<InfoProps>({
      minCost: "inf",
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

export const Field = (hooks: StateHooks) => {
  return <TravelingSalesman hooks={hooks} />;
};

export const InfoArea = (hooks: StateHooks) => {
  const [plots, setPlots] = hooks.useGenerator;
  const [result, setResult] = hooks.useInfo;
  return (
    <>
      <div>n={plots.size}</div>
      <div>{result.status}</div>
      <div>
        Minimum Cost: {result.minCost}
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

export const Generator = (hooks: StateHooks) => {
  const [info, useInfo] = hooks.useInfo;

  const defaultInfo: InfoProps = {
    ...info,
    minCost: "inf",
    status: null,
    optimal: null,
  };

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
  const [info, setInfo] = hooks.useInfo;

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
  ];

  return SolverArea<StateHooks, InfoProps>(
    hooks,
    info,
    ToggleButtons,
    "vertical"
  );
};
