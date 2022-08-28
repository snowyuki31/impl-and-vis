import Layout from "../layout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";

const VisPage = ({
  pagename,
  field,
  generator,
  solver,
}: {
  pagename: string;
  field: React.ReactNode;
  generator: React.ReactNode;
  solver: React.ReactNode;
}) => {
  return (
    <Layout pagename={pagename}>
      <h1>{pagename}</h1>
      {field}
      <Container>
        <Grid container justifyContent="center" columnSpacing={1}>
          <Grid xs={8} sm={4} item>
            <GeneratorTemplate>{generator}</GeneratorTemplate>
          </Grid>
          <Grid xs={8} sm={4} item>
            <SolverTemplate>{solver}</SolverTemplate>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default VisPage;

const GeneratorTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <h3 style={{ textAlign: "center" }}>Generator</h3>
      {children}
    </Box>
  );
};

const SolverTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <h3 style={{ textAlign: "center" }}>Solver</h3>
      <Box style={{ textAlign: "center" }}>{children}</Box>
    </Box>
  );
};
