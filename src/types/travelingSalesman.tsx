import {
  GeneratorPropsBase,
  SolverPropsBase,
  InfoPropsBase,
  StateHooksBase,
} from "./typeBases";

export const SolverOptions = {
  BF: "Brute Force",
  DP: "Held-Karp",
  NN: "Nearest Neighbor",
  TwoOpt: "NN + 2-opt",
} as const;

export const SizeOptions = {
  Small: 10,
  Medium: 17,
  Large: 100,
  Extreme: 500,
} as const;

export const VisOptions = {
  Width: 2000,
  CircleColor: "rgba(255, 255, 255, 0.4)",
  LineColor: "#C84B31",
} as const;

export type GeneratorProps = GeneratorPropsBase & {
  size: typeof SizeOptions[keyof typeof SizeOptions];
};

export type SolverProps = SolverPropsBase & {
  solver: typeof SolverOptions[keyof typeof SolverOptions] | null;
};

export type InfoProps = InfoPropsBase & {
  minCost: string;
  optimal: string | null;
};

export const defaultInfo: InfoProps = {
  progress: 0,
  minCost: "inf",
  optimal: null,
  calculationTime: null,
};

export type StateHooks = StateHooksBase<GeneratorProps, SolverProps, InfoProps>;
