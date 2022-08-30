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
  const title = (pagename !== "" ? pagename + " | " : "") + "Impl-and-vis";
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Head>
          <title>{title}</title>
        </Head>
        <Box
          sx={{
            marginTop: {
              xs: 4,
              md: 0,
            },
            marginBottom: {
              xs: 20,
              md: 0,
            },
            paddingTop: {
              xs: 0,
              md: 8,
            },
            paddingBottom: {
              xs: 0,
              md: 8,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
