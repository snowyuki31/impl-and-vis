import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
});

const Layout = ({
  pagename,
  children,
}: {
  pagename: string;
  children: React.ReactNode;
}) => {
  const title = (pagename !== "" ? pagename + " | " : "") + "impl-and-vis";
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Head>
          <title>{title}</title>
        </Head>
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
