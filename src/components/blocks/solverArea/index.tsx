import { GeneralStateHooks, InfoPropsBase } from "../../../models/typeBases";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type solverNames = {
  readonly [key: string]: string;
};

type disableConditions = {
  [name: string]: boolean;
};

export const SolverArea = <
  T extends GeneralStateHooks,
  I extends InfoPropsBase
>(
  hooks: T,
  defaultInfo: I,
  SolverOptions: solverNames,
  isDisabled?: disableConditions,
  orientation?: "horizontal" | "vertical"
) => {
  const [solver, setSolver] = hooks.useSolver;
  const [_, setInfo] = hooks.useInfo;

  const ToggleButtons: JSX.Element[] = [];
  Object.entries(SolverOptions).forEach(([key, value]) => {
    ToggleButtons.push(
      <ToggleButton
        key={key}
        value={value}
        disabled={isDisabled && isDisabled[value]}
      >
        {value}
      </ToggleButton>
    );
  });

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
