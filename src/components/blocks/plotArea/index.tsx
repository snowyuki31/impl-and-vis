import Box from "@mui/material/Box";

export type PlotAreaProps = {
  seed: number;
  size: number;
  numPlots: number;
};

export const PlotArea = ({ plots }: { plots: PlotAreaProps }) => {
  return (
    <Box
      sx={{ height: { xs: "60vw", sm: "50vw", md: "40vw", lg: "400px" } }}
    ></Box>
  );
};

export default PlotArea;
