import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { GeneralStateHooks, InfoPropsBase } from "../../../types/typeBases";

export const GeneratorArea = <
  T extends GeneralStateHooks,
  I extends InfoPropsBase
>(
  hooks: T,
  defaultInfo: I,
  ToggleButtons: JSX.Element[]
) => {
  const [generator, setGenerator] = hooks.useGenerator;
  const [solver, setSolver] = hooks.useSolver;
  const [info, setInfo] = hooks.useInfo;

  return (
    <>
      <Accordion sx={{ m: 1, bgcolor: "inherit" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <TextField
            type="number"
            label="seed"
            variant="standard"
            size="small"
            value={generator.seed}
            onChange={(e) => {
              setGenerator({ ...generator, seed: Number(e.target.value) });
              setSolver({ ...solver, solver: null });
              setInfo(defaultInfo);
            }}
          ></TextField>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column">
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={generator.size}
              onChange={(_, newSize) => {
                if (newSize !== null) {
                  setGenerator({ ...generator, size: newSize });
                  setSolver({ ...solver, solver: null });
                  setInfo(defaultInfo);
                }
              }}
              size="small"
              orientation="vertical"
            >
              {ToggleButtons}
            </ToggleButtonGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default GeneratorArea;
