import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { PlotAreaProps } from "../../blocks/plotArea";

export type ResultState = {
  minCost: number;
};

export type SolverProps = {
  solver: string;
};

export type TravelingSalesmanSolver = {
  usePlots: [PlotAreaProps, Dispatch<SetStateAction<PlotAreaProps>>];
  useSolver: [SolverProps, Dispatch<SetStateAction<SolverProps>>];
  useResult: [ResultState, Dispatch<SetStateAction<ResultState>>];
};

const TravelingSalesman = () => {
  return <></>;
};

export default TravelingSalesman;
