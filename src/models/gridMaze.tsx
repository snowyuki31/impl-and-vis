import {
  GeneratorPropsBase,
  SolverPropsBase,
  InfoPropsBase,
  StateHooksBase,
} from "./typeBases";

import { Dispatch, SetStateAction } from "react";

export const SolverOptions = {
  BFS: "BFS",
  DFS: "DFS",
  AStar: "A*",
} as const;

export const SizeOptions = {
  Small: 21,
  Medium: 35,
  Large: 61,
} as const;

export type GeneratorProps = GeneratorPropsBase & {
  size: typeof SizeOptions[keyof typeof SizeOptions];
};

export type SolverProps = SolverPropsBase & {
  solver: typeof SolverOptions[keyof typeof SolverOptions] | null;
};

export const defaultInfo: InfoProps = {
  calculationTime: null,
  progress: 0,
  length: null,
  visited: null,
} as const;

export type InfoProps = InfoPropsBase & {
  length: number | null;
  visited: number | null;
};

export type StateHooks = StateHooksBase<GeneratorProps, SolverProps, InfoProps>;

export type setTypeObject = {
  setGenerator: Dispatch<SetStateAction<GeneratorProps>>;
  setSolver: Dispatch<SetStateAction<SolverProps>>;
  setInfo: Dispatch<SetStateAction<InfoProps>>;
};
