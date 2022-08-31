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
} from "../../types/graphColoring";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";
import ToggleButton from "@mui/material/ToggleButton";

const GraphColoringPage: NextPage = () => {
  const hooks: StateHooks = {
    useGenerator: useState<GeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
    }),
    useSolver: useState<SolverProps>({
      solver: null,
    }),
    useInfo: useState<InfoProps>({}),
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
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo = { ...info };
  const ToggleButtons = [
    <ToggleButton key="small" value={SizeOptions.Small}>
      Small
    </ToggleButton>,
    <ToggleButton key="medium" value={SizeOptions.Medium}>
      Medium
    </ToggleButton>,
    <ToggleButton key="large" value={SizeOptions.Large}>
      Large
    </ToggleButton>,
  ];

  return GeneratorArea<StateHooks, InfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};

export const Solver = (hooks: StateHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo: InfoProps = { ...info };
  const ToggleButtons = [
    <ToggleButton key={SolverOptions.Greedy} value={SolverOptions.Greedy}>
      {SolverOptions.Greedy}
    </ToggleButton>,
  ];

  return SolverArea<StateHooks, InfoProps>(hooks, defaultInfo, ToggleButtons);
};
