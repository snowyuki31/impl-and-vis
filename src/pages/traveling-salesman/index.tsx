import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import TravelingSalesman from "../../components/modules/travelingSalesman";
import SolverArea from "../../components/blocks/solverArea";
import InfoArea from "../../components/blocks/infoArea";
import { CanvasArea } from "../../components/blocks/canvasArea";
import GeneratorArea from "../../components/blocks/generatorArea";

import {
  SolverOptions,
  SizeOptions,
  GeneratorProps,
  SolverProps,
  InfoProps,
  defaultInfo,
  StateHooks,
} from "../../models/travelingSalesman";

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
      Cost: {result.minCost ? result.minCost.toFixed(2) : "inf"}
      {result.optimal === null ? "" : " (" + result.optimal + ")"}
    </div>
  );
  const isWarning = generator.size > 300 && result.calculationTime === null;

  return InfoArea({ hooks, inputInfo, outputInfo, isWarning });
};

export const Generator = (hooks: StateHooks) => {
  return GeneratorArea<StateHooks, InfoProps>(hooks, defaultInfo, SizeOptions);
};

export const Solver = (hooks: StateHooks) => {
  const generator = hooks.useGenerator[0];

  const isDisabled: { [name: string]: boolean } = {};
  isDisabled[SolverOptions.BF] = generator.size > 12;
  isDisabled[SolverOptions.DP] = generator.size > 20;

  return SolverArea<StateHooks, InfoProps>(
    hooks,
    defaultInfo,
    SolverOptions,
    isDisabled,
    "vertical"
  );
};
