import React from "react";
import Sidebars from "./components/Sidebars";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";

function MainLayout({ children }) {
  return (
    <Stack direction="row">
      <Sidebars />
      <Box sx={{ flex: 1, px: { xs: 2, md: 4, lg: 8 } }}>
        <Header />
        {children}
      </Box>
    </Stack>
  );
}

export default MainLayout;
