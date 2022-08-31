import { Dispatch, SetStateAction } from "react";

export type GeneratorProps = {
  seed: number;
  size: number;
};

export type SolverProps = {
  solver: string;
};

export type InfoProps = {};

export type StateHooks<
  G extends GeneratorProps,
  S extends SolverProps,
  I extends InfoProps
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