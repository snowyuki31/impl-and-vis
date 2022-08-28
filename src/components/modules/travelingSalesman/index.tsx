import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import { CanvasRenderingContext2D } from "canvas";

import init, { Graph } from "wasm-lib";

export type TSPState = {
  seed: number;
  size: number;
  numPlots: number;
};

export type ResultState = {
  minCost: number;
};

export type SolverProps = {
  solver: string;
};

export type TravelingSalesmanSolver = {
  usePlots: [TSPState, Dispatch<SetStateAction<TSPState>>];
  useSolver: [SolverProps, Dispatch<SetStateAction<SolverProps>>];
  useResult: [ResultState, Dispatch<SetStateAction<ResultState>>];
};

const TravelingSalesman = ({
  useProps,
}: {
  useProps: TravelingSalesmanSolver;
}) => {
  const [plots, setPlots] = useProps.usePlots;
  const [solver, setSolver] = useProps.useSolver;
  const [result, setResult] = useProps.useResult;

  const [graph, setGraph] = useState<Graph>();

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      setContext(canvas.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    init().then(() => {
      const graph = Graph.new(plots.numPlots, plots.seed, plots.size);
      graph.build();
      setGraph(graph);
      console.log(plots.numPlots);
    });
  }, [plots.seed, plots.numPlots]);

  useEffect(() => {
    if (context !== null && graph) {
      console.log("len:", graph.get_nodes().length);
      context.clearRect(0, 0, 400, 400);

      graph.get_nodes().forEach((element: number) => {
        const y = element % plots.size;
        const x = (element - y) / plots.size;

        context.strokeStyle = "white";
        context.beginPath();
        context.arc(x, y, 3, 0, 360, false);
        context.stroke();
      });
      context.save();
    }
  }, [context, graph]);

  return (
    <Box>
      <canvas ref={canvasRef} width={400} height={400} />
    </Box>
  );
};

export default TravelingSalesman;
