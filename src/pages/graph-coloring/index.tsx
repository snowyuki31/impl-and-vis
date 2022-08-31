import type { NextPage } from "next";
import { useState } from "react";
import VisPage from "../../components/templates/visPage";

import GraphColoring, {
  GraphColoringGeneratorProps,
  GraphColoringSolverProps,
  GraphColoringInfoProps,
  GraphColoringHooks,
} from "../../components/modules/graphColoring";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";
import ToggleButton from "@mui/material/ToggleButton";

const enum InputOptions {
  widthSmall = 21,
  widthMedium = 35,
  widthLarge = 61,
}

const GraphColoringPage: NextPage = () => {
  const hooks: GraphColoringHooks = {
    useGenerator: useState<GraphColoringGeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
    }),
    useSolver: useState<GraphColoringSolverProps>({
      solver: "None",
    }),
    useInfo: useState<GraphColoringInfoProps>({}),
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

export const Field = (hooks: GraphColoringHooks) => {
  return <GraphColoring hooks={hooks}></GraphColoring>;
};

export const InfoArea = (hooks: GraphColoringHooks) => {
  const [result, setResult] = hooks.useInfo;
  return <></>;
};

export default GraphColoringPage;

export const Generator = (hooks: GraphColoringHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo = { ...info };
  const ToggleButtons = [
    <ToggleButton key="small" value={InputOptions.widthSmall}>
      Small
    </ToggleButton>,
    <ToggleButton key="medium" value={InputOptions.widthMedium}>
      Medium
    </ToggleButton>,
    <ToggleButton key="large" value={InputOptions.widthLarge}>
      Large
    </ToggleButton>,
  ];

  return GeneratorArea<GraphColoringHooks, GraphColoringInfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};

export const Solver = (hooks: GraphColoringHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo = { ...info };
  const ToggleButtons = [
    <ToggleButton key="s1" value={"solver1"}>
      solver1
    </ToggleButton>,
  ];

  return SolverArea<GraphColoringHooks, GraphColoringInfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};
