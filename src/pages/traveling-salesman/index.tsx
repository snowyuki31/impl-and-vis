import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman, {
  TSPGeneratorProps,
  TSPInfoProps,
  TSPSolverProps,
  TSPHooks,
} from "../../components/modules/travelingSalesman";

import SolverArea from "../../components/blocks/solverArea";

import ToggleButton from "@mui/material/ToggleButton";
import GeneratorArea from "../../components/blocks/generatorArea";

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
  const [info, useInfo] = hooks.useInfo;
  const ToggleButtons = [
    <ToggleButton value={InputOptions.numPlotsSmall}>Small</ToggleButton>,
    <ToggleButton value={InputOptions.numPlotsMedium}>Medium</ToggleButton>,
    <ToggleButton value={InputOptions.numPlotsLarge}>Large</ToggleButton>,
    <ToggleButton value={InputOptions.numPlotsExtreme}>Extreme</ToggleButton>,
  ];
  return GeneratorArea<TSPHooks, TSPInfoProps>(hooks, info, ToggleButtons);
};

export const Solver = (hooks: TSPHooks) => {
  const [generator, setGenerator] = hooks.useGenerator;
  const [info, setInfo] = hooks.useInfo;

  const ToggleButtons = [
    <ToggleButton value="brute-force" disabled={generator.size > 12}>
      Brute Force
    </ToggleButton>,
    <ToggleButton value="bitDP" disabled={generator.size > 20}>
      Held-Karp
    </ToggleButton>,
    <ToggleButton value="nn">Nearest Neighbor</ToggleButton>,
    <ToggleButton value="nn-2opt">NN + 2-opt</ToggleButton>,
  ];

  return SolverArea<TSPHooks, TSPInfoProps>(
    hooks,
    info,
    ToggleButtons,
    "vertical"
  );
};
