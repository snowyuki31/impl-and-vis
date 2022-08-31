import type { NextPage } from "next";
import { useState } from "react";

import VisPage from "../../components/templates/visPage";
import Maze from "../../components/modules/gridMaze";
import Cell from "../../components/atoms/cell";

import {
  GeneratorProps,
  SolverProps,
  InfoProps,
  StateHooks,
  SizeOptions,
  SolverOptions,
  defaultInfo,
} from "../../types/gridMaze";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";
import CanvasArea from "../../components/blocks/canvasArea";
import InfoArea from "../../components/blocks/infoArea";

import Stack from "@mui/material/Stack";
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
    useInfo: useState<InfoProps>(defaultInfo),
  };

  return (
    <VisPage
      pagename="Grid Maze"
      field={Field(hooks)}
      infoArea={Info(hooks)}
      generator={Generator(hooks)}
      solver={Solver(hooks)}
    ></VisPage>
  );
};

export default GridMaze;

export const Field = (hooks: StateHooks) => {
  const field = <Maze hooks={hooks}></Maze>;
  return <CanvasArea hooks={hooks} field={field}></CanvasArea>;
};

export const Info = (hooks: StateHooks) => {
  const { size } = hooks.useGenerator[0];
  const { length, visited } = hooks.useInfo[0];
  const inputInfo = (
    <div>
      Size: {size}×{size}
    </div>
  );
  const outputInfo = (
    <>
      <div>Path Length: {length}</div>
      <div>Visited Cells: {visited}</div>
    </>
  );

  const legend = (
    <>
      <Stack direction="row" justifyContent="center" spacing={5} sx={{ mt: 1 }}>
        <Stack direction="row" justifyContent="center">
          <Cell states={["start"]} value={-1} width={-1} />
          Start
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Cell states={["goal"]} value={-1} width={-1} />
          Goal
        </Stack>
      </Stack>
    </>
  );

  return InfoArea({ hooks, inputInfo, outputInfo, legend });
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
  ];

  return GeneratorArea<StateHooks, InfoProps>(
    hooks,
    defaultInfo,
    ToggleButtons
  );
};

export const Solver = (hooks: StateHooks) => {
  const [info, setInfo] = hooks.useInfo;
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
