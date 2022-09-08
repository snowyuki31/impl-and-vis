import type { NextPage } from "next";
import { useState, createContext } from "react";

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
  setTypeObject,
} from "../../models/gridMaze";

import SolverArea from "../../components/blocks/solverArea";
import GeneratorArea from "../../components/blocks/generatorArea";
import CanvasArea from "../../components/blocks/canvasArea";
import InfoArea from "../../components/blocks/infoArea";

import Stack from "@mui/material/Stack";

export const setStateContext = createContext({} as setTypeObject);

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

  const [generator, setGenerator] = useState<GeneratorProps>({
    seed: Math.floor(Math.random() * 100),
    size: SizeOptions.Small,
  });
  const [solver, setSolver] = useState<SolverProps>({ solver: null });
  const [info, setInfo] = useState<InfoProps>(defaultInfo);

  return (
    <setStateContext.Provider value={{ setGenerator, setSolver, setInfo }}>
      <VisPage
        pagename="Grid Maze"
        field={Field(hooks)}
        infoArea={Info(hooks)}
        generator={Generator(hooks)}
        solver={Solver(hooks)}
      ></VisPage>
    </setStateContext.Provider>
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
      <div>Path Length: {length ? length : "-"}</div>
      <div>Visited Cells: {visited ? visited : "-"}</div>
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
  return GeneratorArea<StateHooks, InfoProps>(hooks, defaultInfo, SizeOptions);
};

export const Solver = (hooks: StateHooks) => {
  return SolverArea<StateHooks, InfoProps>(hooks, defaultInfo, SolverOptions);
};
