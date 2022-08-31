import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import Maze, {
  MazeGeneratorProps,
  MazeSolverProps,
  MazeInfoProps,
  MazeHooks,
} from "../../components/modules/gridMaze";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";

import ToggleButton from "@mui/material/ToggleButton";

const enum InputOptions {
  widthSmall = 21,
  widthMedium = 35,
  widthLarge = 61,
}

const GridMaze: NextPage = () => {
  const hooks: MazeHooks = {
    useGenerator: useState<MazeGeneratorProps>({
      seed: Math.floor(Math.random() * 100),
      size: 35,
    }),
    useSolver: useState<MazeSolverProps>({
      solver: "None",
    }),
    useInfo: useState<MazeInfoProps>({
      length: -1,
      visited: -1,
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

export const Field = (hooks: MazeHooks) => {
  return <Maze hooks={hooks}></Maze>;
};

export const InfoArea = (hooks: MazeHooks) => {
  const [result, setResult] = hooks.useInfo;
  return (
    <>
      <div>Path Length: {result.length != -1 ? result.length : "-"}</div>
      <div>Visited Cells: {result.visited != -1 ? result.visited : "-"}</div>
    </>
  );
};

export const Generator = (hooks: MazeHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo = { ...info, length: -1, visited: -1 };
  const ToggleButtons = [
    <ToggleButton value={InputOptions.widthSmall}>Small</ToggleButton>,
    <ToggleButton value={InputOptions.widthMedium}>Medium</ToggleButton>,
    <ToggleButton value={InputOptions.widthLarge}>Large</ToggleButton>,
  ];

  return GeneratorArea<MazeHooks, MazeInfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};

export const Solver = (hooks: MazeHooks) => {
  const [info, setInfo] = hooks.useInfo;
  const defaultInfo = { ...info, length: -1, visited: -1 };
  const ToggleButtons = [
    <ToggleButton value={"bfs"}>BFS</ToggleButton>,
    <ToggleButton value={"dfs"}>DFS</ToggleButton>,
    <ToggleButton value={"astar"}>A*</ToggleButton>,
  ];

  return SolverArea<MazeHooks, MazeInfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};
