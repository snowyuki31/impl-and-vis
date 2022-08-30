import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { CanvasRenderingContext2D } from "canvas";

import init, { Graph } from "wasm-lib";
import useInterval from "../../../utils/useInterval";

import styles from "./style.module.css";

export type TSPState = {
  seed: number;
  size: number;
  numPlots: number;
};

export type ResultState = {
  minCost: number;
  calculationTime: number;
  status: string;
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
  const [paths, setPaths] = useState<Uint32Array | null>();
  const [costs, setCosts] = useState<Float64Array | null>();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [lineContext, setLineContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [resultContext, setResultContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  function get_coords(idx: number) {
    const y = idx % plots.size;
    const x = (idx - y) / plots.size;
    return [x, y];
  }

  useEffect(() => {
    const canvas: any = bgCanvasRef.current;
    const lineCanvas: any = lineCanvasRef.current;
    const resultCanvas: any = resultCanvasRef.current;
    if (canvas && lineCanvas) {
      setContext(canvas.getContext("2d"));
      setLineContext(lineCanvas.getContext("2d"));
      setResultContext(resultCanvas.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    setPaths(null);
    setCosts(null);
    setProgress(0);
    setResult({ ...result, minCost: 2e9 });
    setIndex(0);

    init().then(() => {
      const graph = Graph.new(plots.numPlots, plots.seed, plots.size);
      graph.build();
      setGraph(graph);
    });
  }, [plots.seed, plots.numPlots, solver.solver]);

  useEffect(() => {
    if (context !== null && graph) {
      console.log("len:", graph.get_nodes().length);
      context.clearRect(0, 0, plots.size, plots.size);
      lineContext?.clearRect(0, 0, plots.size, plots.size);
      resultContext?.clearRect(0, 0, plots.size, plots.size);

      graph.get_nodes().forEach((element: number) => {
        const [x, y] = get_coords(element);

        context.strokeStyle = "white";
        context.lineWidth = 7;
        context.beginPath();
        context.arc(x, y, 30, 0, 360, false);
        context.stroke();
      });
      context.save();
    }
  }, [context, graph]);

  useEffect(() => {
    if (graph) {
      const startTime = performance.now();
      if (solver.solver === "brute-force") {
        console.log("brute force running!");
        var result = graph.solve_bf();
        setPaths(result);
        setCosts(graph.get_costs());
      } else if (solver.solver === "bitDP") {
        console.log("bitDP running!");
        var result = graph.solve_dp();
        setPaths(result);
        setCosts(graph.get_costs());
      }

      const endTime = performance.now();
      console.log("time: ", endTime - startTime);
    }
  }, [solver.solver]);

  useInterval(() => {
    if (paths && costs && lineContext && resultContext) {
      if (index < paths.length) {
        let cost = costs[index / plots.numPlots];

        if (cost < result.minCost) {
          setResult({ ...result, minCost: cost });
          resultContext?.clearRect(0, 0, plots.size, plots.size);
          resultContext.strokeStyle = "#4747eb";
          resultContext.lineWidth = 12;

          resultContext.beginPath();

          for (let i = index; i < index + plots.numPlots; i++) {
            const [sx, sy] = get_coords(paths[i]);
            let [gx, gy] = [0, 0];
            if (i + 1 == index + plots.numPlots) {
              [gx, gy] = get_coords(paths[index]);
            } else {
              [gx, gy] = get_coords(paths[i + 1]);
            }
            resultContext.moveTo(sx, sy);
            resultContext.lineTo(gx, gy);
          }

          resultContext.stroke();
        }

        lineContext?.clearRect(0, 0, plots.size, plots.size);
        lineContext.strokeStyle = "#EB4747";
        lineContext.lineWidth = 7;
        lineContext.beginPath();

        for (let i = index; i < index + plots.numPlots; i++) {
          const [sx, sy] = get_coords(paths[i]);
          let [gx, gy] = [0, 0];
          if (i + 1 == index + plots.numPlots) {
            [gx, gy] = get_coords(paths[index]);
          } else {
            [gx, gy] = get_coords(paths[i + 1]);
          }
          lineContext.moveTo(sx, sy);
          lineContext.lineTo(gx, gy);
        }
        lineContext.stroke();

        setIndex(index + plots.numPlots);
        setProgress((index * 100) / paths.length);
      } else if (index == paths.length) {
        lineContext?.clearRect(0, 0, plots.size, plots.size);
        setProgress(100);
      }
    }
  }, 100);

  return (
    <>
      <Box sx={{ height: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" } }}>
        <div className={styles.canvas_wrap}>
          <canvas
            ref={bgCanvasRef}
            width={plots.size}
            height={plots.size}
            className={styles.canvas}
          />
          <canvas
            ref={lineCanvasRef}
            width={plots.size}
            height={plots.size}
            className={styles.canvas}
          />
          <canvas
            ref={resultCanvasRef}
            width={plots.size}
            height={plots.size}
            className={styles.canvas}
          />
        </div>
      </Box>
      <LinearProgress variant="determinate" color="inherit" value={progress} />
    </>
  );
};

export default TravelingSalesman;
