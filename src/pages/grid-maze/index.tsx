import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import Maze from "../../components/modules/gridMaze";

import {
  GeneratorProps,
  SolverProps,
  InfoProps,
  StateHooks,
  SizeOptions,
  SolverOptions,
} from "../../types/gridMaze";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";

import ToggleButton from "@mui/material/ToggleButton";

const GridMaze: NextPage = () => {
  const hooks: StateHooks = {
    useGenerator: useState<GeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: SizeOptions.Small,
    }),
    useSolver: useState<SolverProps>({
      solver: null,
    }),
    useInfo: useState<InfoProps>({
      length: "-",
      visited: "-",
    }),
  };

  return (
    <VisPage
      pagename="Grid Maze"
      field={Field(hooks)}
      infoArea={InfoArea(hooks)}
      generator={Generator(hooks)}
      solver={Solver(hooks)}
    ></VisPage>
  );
};

export default GridMaze;

export const Field = (hooks: StateHooks) => {
  return <Maze hooks={hooks}></Maze>;
};

export const InfoArea = (hooks: StateHooks) => {
  const [result, setResult] = hooks.useInfo;
  return (
    <>
      <div>Path Length: {result.length}</div>
      <div>Visited Cells: {result.visited}</div>
    </>
  );
};

export const Generator = (hooks: StateHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo: InfoProps = { ...info, length: "-", visited: "-" };
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
  ];

  return GeneratorArea<StateHooks, InfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};

export const Solver = (hooks: StateHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo: InfoProps = { ...info, length: "-", visited: "-" };
  const ToggleButtons = [
    <ToggleButton key={SolverOptions.BFS} value={SolverOptions.BFS}>
      {SolverOptions.BFS}
    </ToggleButton>,
    <ToggleButton key={SolverOptions.DFS} value={SolverOptions.DFS}>
      {SolverOptions.DFS}
    </ToggleButton>,
    <ToggleButton key={SolverOptions.AStar} value={SolverOptions.AStar}>
      {SolverOptions.AStar}
    </ToggleButton>,
  ];

  return SolverArea<StateHooks, InfoProps>(hooks, defaultInfo, ToggleButtons);
};
