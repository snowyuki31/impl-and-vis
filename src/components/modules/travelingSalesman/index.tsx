import {
  useState,
  useEffect,
  useRef,
  RefObject,
  SetStateAction,
  Dispatch,
} from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { CanvasRenderingContext2D } from "canvas";

import init, { Graph } from "wasm-lib";
import useInterval from "../../../utils/useInterval";

import styles from "./style.module.css";
import {
  SolverOptions,
  GeneratorProps,
  StateHooks,
} from "../../../types/travelingSalesman";

export type CanvasState = {
  bgContext: CanvasRenderingContext2D | null;
  resultContext: CanvasRenderingContext2D | null;
};

const plotSize = 2000;
function get_coords(idx: number) {
  const y = idx % plotSize;
  const x = (idx - y) / plotSize;
  return [x, y];
}

const InitCanvas = (
  bgCanvasRef: RefObject<HTMLCanvasElement>,
  resultCanvasRef: RefObject<HTMLCanvasElement>,
  setCanvasState: Dispatch<SetStateAction<CanvasState>>
) => {
  useEffect(() => {
    const bgCanvas: any = bgCanvasRef.current;
    const resultCanvas: any = resultCanvasRef.current;
    if (bgCanvas && resultCanvas) {
      setCanvasState({
        bgContext: bgCanvas.getContext("2d"),
        resultContext: resultCanvas.getContext("2d"),
      });
    }
  }, []);
};

const InitBgCanvas = (
  canvasState: CanvasState,
  generator: GeneratorProps,
  graph?: Graph
) => {
  useEffect(() => {
    if (canvasState !== null && canvasState.bgContext !== null && graph) {
      console.log("len:", graph.get_nodes().length);
      canvasState.bgContext.clearRect(0, 0, plotSize, plotSize);

      graph.get_nodes().forEach((element: number) => {
        const [x, y] = get_coords(element);
        if (canvasState.bgContext !== null) {
          if (generator.size <= 300) {
            canvasState.bgContext.strokeStyle = "rgba(255, 255, 255, 0.4)";
            canvasState.bgContext.lineWidth = 12;
            canvasState.bgContext.beginPath();
            canvasState.bgContext.arc(x, y, 40, 0, 360, false);
            canvasState.bgContext.stroke();
          } else {
            canvasState.bgContext.strokeStyle = "rgba(255, 255, 255, 0.4)";
            canvasState.bgContext.lineWidth = 7;
            canvasState.bgContext.beginPath();
            canvasState.bgContext.arc(x, y, 25, 0, 360, false);
            canvasState.bgContext.stroke();
          }
        }
      });
      canvasState.bgContext.save();
    }
  }, [graph]);
};

const TravelingSalesman = ({ hooks }: { hooks: StateHooks }) => {
  const [generator, setGenerator] = hooks.useGenerator;
  const [solver, setSolver] = hooks.useSolver;
  const [result, setResult] = hooks.useInfo;

  const [graph, setGraph] = useState<Graph>();
  const [paths, setPaths] = useState<Uint32Array | null>();
  const [costs, setCosts] = useState<Float64Array | null>();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    bgContext: null,
    resultContext: null,
  });
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  InitCanvas(bgCanvasRef, resultCanvasRef, setCanvasState);

  useEffect(() => {
    setPaths(null);
    setCosts(null);
    setProgress(0);
    setIndex(0);

    canvasState.resultContext?.clearRect(0, 0, plotSize, plotSize);

    init().then(() => {
      const graph = Graph.new(generator.size, generator.seed, plotSize);
      graph.build();
      setGraph(graph);
    });
  }, [generator, solver]);

  InitBgCanvas(canvasState, generator, graph);

  useEffect(() => {
    if (graph && solver.solver !== null) {
      const startTime = performance.now();
      let solved_paths;
      switch (solver.solver) {
        case SolverOptions.BF:
          solved_paths = graph.solve_bf();
          break;
        case SolverOptions.DP:
          solved_paths = graph.solve_dp();
          break;
        case SolverOptions.NN:
          solved_paths = graph.solve_nn();
          break;
        case SolverOptions.TwoOpt:
          solved_paths = graph.two_opt();
          break;
      }

      setPaths(solved_paths);
      setCosts(graph.get_costs());

      const endTime = performance.now();
      setResult({
        ...result,
        status:
          "Calculation completed in " +
          (endTime - startTime).toFixed(2) +
          " ms",
      });
    }
  }, [solver]);

  useInterval(() => {
    if (paths && costs && canvasState.resultContext) {
      if (index < paths.length) {
        let cost = costs[index / generator.size];

        setResult({ ...result, minCost: cost.toFixed(2), optimal: null });
        setProgress((index * 100) / paths.length);
        canvasState.resultContext.clearRect(0, 0, plotSize, plotSize);
        canvasState.resultContext.strokeStyle = "#C84B31";
        canvasState.resultContext.lineWidth = 12;

        canvasState.resultContext.beginPath();

        for (let i = index; i < index + generator.size; i++) {
          const [sx, sy] = get_coords(paths[i]);
          let [gx, gy] = [0, 0];
          if (i + 1 == index + generator.size) {
            [gx, gy] = get_coords(paths[index]);
          } else {
            [gx, gy] = get_coords(paths[i + 1]);
          }
          canvasState.resultContext.moveTo(sx, sy);
          canvasState.resultContext.lineTo(gx, gy);
        }

        canvasState.resultContext.stroke();

        setIndex(index + generator.size);
      } else if (index == paths.length) {
        setProgress(100);
        if (
          solver.solver === SolverOptions.BF ||
          solver.solver === SolverOptions.DP
        ) {
          setResult({ ...result, optimal: "optimal" });
        } else {
          setResult({ ...result, optimal: "heuristic" });
        }
      }
    }
  }, 100);

  return (
    <>
      <Box sx={{ height: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" } }}>
        <div className={styles.canvas_wrap}>
          <canvas
            ref={bgCanvasRef}
            width={plotSize}
            height={plotSize}
            className={styles.canvas}
          />
          <canvas
            ref={resultCanvasRef}
            width={plotSize}
            height={plotSize}
            className={styles.canvas}
          />
        </div>
      </Box>
      <LinearProgress variant="determinate" color="inherit" value={progress} />
    </>
  );
};

export default TravelingSalesman;
