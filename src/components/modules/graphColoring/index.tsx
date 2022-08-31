import {
  GeneratorProps,
  SolverProps,
  InfoProps,
  StateHooks,
} from "../../../types/basicTypes";

export type GraphColoringGeneratorProps = GeneratorProps;

export type GraphColoringSolverProps = SolverProps;

export type GraphColoringInfoProps = InfoProps & {};

export type GraphColoringHooks = StateHooks<
  GraphColoringGeneratorProps,
  GraphColoringSolverProps,
  GraphColoringInfoProps
>;

const GraphColoring = ({ hooks }: { hooks: GraphColoringHooks }) => {
  return <></>;
};

export default GraphColoring;
