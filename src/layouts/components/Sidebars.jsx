import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Stack, Typography } from "@mui/material";
import useTodo from "../../hooks/useTodo";

const actions = ["#ffc972", "#ff9b73", "#b692fe", "#01d4ff", "#e4ee90"];
function Sidebars() {
  const [open, setOpen] = React.useState(false);
  const { handleAddTodo } = useTodo();
  const handleOpen = (_, reason) => {
    if (reason !== "toggle") return;
    setOpen(true);
  };
  const handleClose = (_, reason) => {
    if (reason !== "toggle") return;
    setOpen(false);
  };

  const handleChooseClose = (color) => {
    console.log(color);
    setOpen(false);
    handleAddTodo("This is Docket note.", color);
  };

  return (
    <Stack
      sx={{ width: "100px", minHeight: "100vh", borderRight: "1px solid #ccc" }}
      gap={8}
    >
      <Typography textAlign="center" mt={3} fontWeight={500}>
        Docket
      </Typography>
      <Box>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="down"
        >
          {actions.map((color) => (
            <SpeedDialAction
              key={color}
              sx={{
                backgroundColor: color,
                width: "25px",
                height: "25px",
                minHeight: "25px",
                boxShadow: "unset",
                "&:hover": { backgroundColor: color },
              }}
              onClick={() => handleChooseClose(color)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Stack>
  );
}

export default Sidebars;
