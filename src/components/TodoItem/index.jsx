import {
  Box,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useTodo from "../../hooks/useTodo";
import StarIcon from "@mui/icons-material/Star";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/CloseOutlined";

function TodoItemm(props) {
  const { color, todoName, date, markAsStarred, id } = props;
  const [isEdit, setIsEdit] = useState(false);
  const { handleFindAndUpdateTodos, handleRemoveTodo } = useTodo();

  const handleToggleMarkStarred = () => {
    handleFindAndUpdateTodos(id, { markAsStarred: !markAsStarred });
  };

  const handleEditTodoName = (name) => {
    setIsEdit(false);
    handleFindAndUpdateTodos(id, { todoName: name });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Stack
        justifyContent="space-between"
        sx={{
          position: "relative",
          backgroundColor: color || "#ccc",
          borderRadius: 5,
          p: 3,
          minHeight: "250px",
        }}
      >
        {!isEdit && todoName}
        {isEdit && (
          <TextareaAutosize
            minRows={6}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              backgroundColor: "inherit",
              fontSize: "16px",
              outline: "none",
              border: "none",
              resize: "none",
            }}
            variant="standard"
            autoFocus
            defaultValue={todoName}
            size="small"
            onBlur={(e) => handleEditTodoName(e.target.value)}
          />
        )}
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 8,
            right: 8,
            borderRadius: "50%",
            backgroundColor: "#000",
            width: "30px",
            height: "30px",
          }}
        >
          <Rating
            emptyIcon={
              <StarIcon
                style={{ color: markAsStarred ? "#d9ff00" : "#fff" }}
                fontSize="small"
              />
            }
            onChange={handleToggleMarkStarred}
            defaultValue={1}
            max={1}
            value={markAsStarred ? 1 : 0}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Typography variant="caption">{date || ""}</Typography>
          <Stack direction="row">
            <IconButton onClick={() => handleRemoveTodo(id)}>
              <CloseIcon />
            </IconButton>
            <Box
              onClick={() => setIsEdit(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "#000",
                width: "34px",
                height: "34px",
                cursor: "pointer",
              }}
            >
              <ModeEditIcon style={{ color: "#fff" }} fontSize="small" />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}

export default TodoItemm;
