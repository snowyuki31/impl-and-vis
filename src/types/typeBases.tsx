import { Dispatch, SetStateAction } from "react";

export type GeneratorPropsBase = {
  seed: number;
  size: number;
};

export type SolverPropsBase = {
  solver: string | null;
};

export type InfoPropsBase = {};

export type StateHooksBase<
  G extends GeneratorPropsBase,
  S extends SolverPropsBase,
  I extends InfoPropsBase
> = {
  useGenerator: [G, Dispatch<SetStateAction<G>>];
  useSolver: [S, Dispatch<SetStateAction<S>>];
  useInfo: [I, Dispatch<SetStateAction<I>>];
};

export type GeneralStateHooks = {
  useGenerator: any;
  useSolver: any;
  useInfo: any;
};
