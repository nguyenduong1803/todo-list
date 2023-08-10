import React from "react";
import TodoItemm from "../TodoItem";
import { Grid, Typography } from "@mui/material";
import useTodo from "../../hooks/useTodo";

function Todo() {
  const { todos } = useTodo();
  return (
    <div>
      <Typography variant="h3" mb={5}>
        Notes
      </Typography>
      <Grid container spacing={{ xs: 2, md: 4, lg: 6 }}>
        {todos.map((item, index) => {
          return <TodoItemm key={index} {...item} />;
        })}
      </Grid>
    </div>
  );
}

export default Todo;
