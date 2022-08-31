import { GeneralStateHooks } from "../../../types/typeBases";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export const CanvasArea = <T extends GeneralStateHooks>({
  hooks,
  field,
}: {
  hooks: T;
  field: JSX.Element;
}) => {
  const { progress } = hooks.useInfo[0];
  return (
    <>
      <Box
        sx={{
          height: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" },
          width: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" },
        }}
      >
        {field}
      </Box>
      <LinearProgress variant="determinate" color="inherit" value={progress} />
    </>
  );
};

export default CanvasArea;
