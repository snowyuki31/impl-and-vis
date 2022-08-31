import {
  GeneratorPropsBase,
  SolverPropsBase,
  InfoPropsBase,
  StateHooksBase,
} from "./typeBases";

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

export const defaultInfo = {
  progress: 0,
  length: "-",
  visited: "-",
} as const;

export type InfoProps = InfoPropsBase & {
  length: number | "-";
  visited: number | "-";
};

export type StateHooks = StateHooksBase<GeneratorProps, SolverProps, InfoProps>;
