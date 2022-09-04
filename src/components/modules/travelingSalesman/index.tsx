import {
  useState,
  useEffect,
  useRef,
  RefObject,
  SetStateAction,
  Dispatch,
} from "react";
import { CanvasRenderingContext2D } from "canvas";

import init, { Graph } from "wasm-lib";
import useInterval from "../../../utils/useInterval";

import {
  SolverOptions,
  VisOptions,
  GeneratorProps,
  StateHooks,
} from "../../../types/travelingSalesman";

import Canvas from "../../blocks/canvas";

export type CanvasState = {
  bgContext: CanvasRenderingContext2D | null;
  resultContext: CanvasRenderingContext2D | null;
};

function get_coords(idx: number) {
  const y = idx % VisOptions.Width;
  const x = (idx - y) / VisOptions.Width;
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
      canvasState.bgContext.clearRect(0, 0, VisOptions.Width, VisOptions.Width);

      graph.get_nodes().forEach((element: number) => {
        const [x, y] = get_coords(element);
        if (canvasState.bgContext !== null) {
          canvasState.bgContext.strokeStyle = VisOptions.CircleColor;
          if (generator.size <= 300) {
            canvasState.bgContext.lineWidth = 12;
            canvasState.bgContext.beginPath();
            canvasState.bgContext.arc(x, y, 40, 0, 360, false);
          } else {
            canvasState.bgContext.lineWidth = 7;
            canvasState.bgContext.beginPath();
            canvasState.bgContext.arc(x, y, 25, 0, 360, false);
          }
          canvasState.bgContext.stroke();
        }
      });
      canvasState.bgContext.save();
    }
  }, [graph]);
};

const TravelingSalesman = ({ hooks }: { hooks: StateHooks }) => {
  const generator = hooks.useGenerator[0];
  const { size, seed } = generator;
  const { solver } = hooks.useSolver[0];
  const [result, setResult] = hooks.useInfo;

  const [graph, setGraph] = useState<Graph>();
  const [paths, setPaths] = useState<Uint32Array | null>();
  const [costs, setCosts] = useState<Float64Array | null>();
  const [index, setIndex] = useState(0);

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
    setIndex(0);

    canvasState.resultContext?.clearRect(
      0,
      0,
      VisOptions.Width,
      VisOptions.Width
    );

    init().then(() => {
      const graph = Graph.new(size, seed, VisOptions.Width);
      graph.build();
      setGraph(graph);
    });
  }, [size, seed, solver]);

  InitBgCanvas(canvasState, generator, graph);

  useEffect(() => {
    if (graph && solver !== null) {
      const startTime = performance.now();
      let solved_paths;
      switch (solver) {
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
        case SolverOptions.ILS:
          solved_paths = graph.iterative_local_search();
      }

      setPaths(solved_paths);
      setCosts(graph.get_costs());

      const endTime = performance.now();
      setResult({
        ...result,
        calculationTime: endTime - startTime,
      });
    }
  }, [solver]);

  useInterval(() => {
    if (paths && costs && canvasState.resultContext) {
      if (index < paths.length) {
        let cost = costs[index / generator.size];

        setResult({
          ...result,
          minCost: cost,
          optimal: null,
          progress: (index * 100) / paths.length,
        });
        canvasState.resultContext.clearRect(
          0,
          0,
          VisOptions.Width,
          VisOptions.Width
        );
        canvasState.resultContext.strokeStyle = VisOptions.LineColor;
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
        if (solver === SolverOptions.BF || solver === SolverOptions.DP) {
          setResult({ ...result, optimal: "optimal", progress: 100 });
        } else {
          setResult({ ...result, optimal: "heuristic", progress: 100 });
        }
      }
    }
  }, 100);

  return (
    <Canvas
      bgCanvasRef={bgCanvasRef}
      resultCanvasRef={resultCanvasRef}
      size={VisOptions.Width}
    ></Canvas>
  );
};

export default TravelingSalesman;
