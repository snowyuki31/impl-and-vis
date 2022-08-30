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

export type InfoState = {
  minCost: number;
  optimal: string | null;
  calculationTime: number;
  status: string | null;
};

export type SolverProps = {
  solver: string;
};

export type TravelingSalesmanSolver = {
  usePlots: [TSPState, Dispatch<SetStateAction<TSPState>>];
  useSolver: [SolverProps, Dispatch<SetStateAction<SolverProps>>];
  useInfo: [InfoState, Dispatch<SetStateAction<InfoState>>];
};

const TravelingSalesman = ({
  useProps,
}: {
  useProps: TravelingSalesmanSolver;
}) => {
  const [plots, setPlots] = useProps.usePlots;
  const [solver, setSolver] = useProps.useSolver;
  const [result, setResult] = useProps.useInfo;

  const [graph, setGraph] = useState<Graph>();
  const [paths, setPaths] = useState<Uint32Array | null>();
  const [costs, setCosts] = useState<Float64Array | null>();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [resultContext, setResultContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  function get_coords(idx: number) {
    const y = idx % plots.size;
    const x = (idx - y) / plots.size;
    return [x, y];
  }

  useEffect(() => {
    const canvas: any = bgCanvasRef.current;
    const resultCanvas: any = resultCanvasRef.current;
    if (canvas && resultCanvas) {
      setContext(canvas.getContext("2d"));
      setResultContext(resultCanvas.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    setPaths(null);
    setCosts(null);
    setProgress(0);
    setResult({ ...result, minCost: 2e9, status: null, optimal: null });
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
      resultContext?.clearRect(0, 0, plots.size, plots.size);

      graph.get_nodes().forEach((element: number) => {
        const [x, y] = get_coords(element);

        if (plots.numPlots <= 300) {
          context.strokeStyle = "rgba(255, 255, 255, 0.5)";
          context.lineWidth = 7;
          context.beginPath();
          context.arc(x, y, 30, 0, 360, false);
          context.stroke();
        } else {
          context.strokeStyle = "rgba(255, 255, 255, 0.5)";
          context.lineWidth = 7;
          context.beginPath();
          context.arc(x, y, 20, 0, 360, false);
          context.stroke();
        }
      });
      context.save();
    }
  }, [context, graph]);

  useEffect(() => {
    if (graph && solver.solver != "None") {
      const startTime = performance.now();
      if (solver.solver === "brute-force") {
        console.log("brute force running!");
        let solved_paths = graph.solve_bf();
        setPaths(solved_paths);
        setCosts(graph.get_costs());
      } else if (solver.solver === "bitDP") {
        console.log("bitDP running!");
        let solved_paths = graph.solve_dp();
        setPaths(solved_paths);
        setCosts(graph.get_costs());
      } else if (solver.solver === "nn") {
        console.log("nearest negibors running!");
        let solved_paths = graph.solve_nn();
        setPaths(solved_paths);
        setCosts(graph.get_costs());
      } else if (solver.solver === "nn-2opt") {
        console.log("nearest negibors + 2 opt running!");
        let solved_paths = graph.two_opt();
        setPaths(solved_paths);
        setCosts(graph.get_costs());

        console.log(solved_paths.length);
      }

      const endTime = performance.now();
      setResult({
        ...result,
        status:
          "Calculation completed in " +
          (endTime - startTime).toFixed(2) +
          " ms",
      });
    }
  }, [solver.solver]);

  useInterval(() => {
    if (paths && costs && resultContext) {
      if (index < paths.length) {
        let cost = costs[index / plots.numPlots];

        setResult({ ...result, minCost: cost, optimal: null });
        setProgress((index * 100) / paths.length);
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

        setIndex(index + plots.numPlots);
      } else if (index == paths.length) {
        setProgress(100);
        if (solver.solver === "bitDP" || solver.solver === "brute-force") {
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
