import {
  GeneratorPropsBase,
  SolverPropsBase,
  InfoPropsBase,
  StateHooksBase,
} from "./typeBases";

export const SolverOptions = {
  Greedy: "Greedy",
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

export type InfoProps = InfoPropsBase & {};

export const defaultInfo: InfoProps = {
  progress: 0,
  calculationTime: null,
};

export type StateHooks = StateHooksBase<GeneratorProps, SolverProps, InfoProps>;
