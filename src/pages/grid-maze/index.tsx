import type { NextPage } from "next";
import { useState, Dispatch, SetStateAction } from "react";
import Layout from "../../components/templates/layout";
import Maze from "../../components/blocks/gridMaze";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";

const GridMaze: NextPage = () => {
  const [width, setWidth] = useState(35);
  const [height, setHeight] = useState(35);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 100));
  const [solver, setSolver] = useState("None");

  return (
    <Layout pagename="Grid Maze">
      <h1>Grid Maze</h1>

      <Maze width={width} height={height} seed={seed} solver={solver}></Maze>

      <Container>
        <Grid container justifyContent="center" columnSpacing={1}>
          <Grid xs={8} sm={4}>
            <Box>
              <h3 style={{ textAlign: "center" }}>Generator</h3>
              <Accordion sx={{ m: 1, bgcolor: "inherit" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TextField
                    type="number"
                    label="seed"
                    variant="standard"
                    size="small"
                    value={seed}
                    onChange={(e) => {
                      handleChange(e, setSeed);
                      setSolver("None");
                    }}
                  ></TextField>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="column">
                    <ToggleButtonGroup
                      color="primary"
                      value={width}
                      exclusive
                      onChange={(event, newSize) => {
                        if (newSize !== null) {
                          setWidth(newSize);
                          setHeight(newSize);
                          setSolver("None");
                        }
                      }}
                      size="small"
                    >
                      <ToggleButton value={21}>Small</ToggleButton>
                      <ToggleButton value={35}>Medium</ToggleButton>
                      <ToggleButton value={61}>Large</ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid xs={8} sm={4}>
            <Box>
              <h3 style={{ textAlign: "center" }}>Solver</h3>
              <Box style={{ textAlign: "center" }}>
                <ToggleButtonGroup
                  color="primary"
                  value={solver}
                  exclusive
                  onChange={(event, newSolver) => {
                    if (newSolver !== null) setSolver(newSolver);
                  }}
                  size="medium"
                >
                  <ToggleButton value="bfs">BFS</ToggleButton>
                  <ToggleButton value="dfs">DFS</ToggleButton>
                  <ToggleButton value="astar">A*</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default GridMaze;

const handleChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  f: Dispatch<SetStateAction<number>>
) => {
  f(() => Number(e.target.value));
};
