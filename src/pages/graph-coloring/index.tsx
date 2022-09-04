import type { NextPage } from "next";
import { useState } from "react";
import VisPage from "../../components/templates/visPage";

import GraphColoring from "../../components/modules/graphColoring";

import {
  GeneratorProps,
  SolverProps,
  InfoProps,
  StateHooks,
  SizeOptions,
  SolverOptions,
  defaultInfo,
} from "../../models/graphColoring";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";

const GraphColoringPage: NextPage = () => {
  const hooks: StateHooks = {
    useGenerator: useState<GeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
    }),
    useSolver: useState<SolverProps>({
      solver: null,
    }),
    useInfo: useState<InfoProps>(defaultInfo),
  };

  return (
    <VisPage
      pagename="Graph Coloring"
      field={Field(hooks)}
      infoArea={InfoArea(hooks)}
      generator={Generator(hooks)}
      solver={Solver(hooks)}
    ></VisPage>
  );
};

export const Field = (hooks: StateHooks) => {
  return <GraphColoring hooks={hooks}></GraphColoring>;
};

export const InfoArea = (hooks: StateHooks) => {
  const [result, setResult] = hooks.useInfo;
  return <></>;
};

export default GraphColoringPage;

export const Generator = (hooks: StateHooks) => {
  return GeneratorArea<StateHooks, InfoProps>(hooks, defaultInfo, SizeOptions);
};

export const Solver = (hooks: StateHooks) => {
  return SolverArea<StateHooks, InfoProps>(hooks, defaultInfo, SolverOptions);
};
