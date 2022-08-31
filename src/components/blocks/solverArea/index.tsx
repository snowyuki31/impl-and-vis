import { GeneralStateHooks, InfoPropsBase } from "../../../types/typeBases";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const SolverArea = <
  T extends GeneralStateHooks,
  I extends InfoPropsBase
>(
  hooks: T,
  defaultInfo: I,
  ToggleButtons: JSX.Element[],
  orientation?: "horizontal" | "vertical"
) => {
  const [solver, setSolver] = hooks.useSolver;
  const [_, setInfo] = hooks.useInfo;

  return (
    <ToggleButtonGroup
      color="primary"
      value={solver.solver}
      exclusive
      onChange={(_, newSolver) => {
        if (newSolver !== null) {
          setSolver({ ...solver, solver: newSolver });
          setInfo(defaultInfo);
        }
      }}
      size="medium"
      orientation={orientation}
    >
      {ToggleButtons}
    </ToggleButtonGroup>
  );
};

export default SolverArea;
