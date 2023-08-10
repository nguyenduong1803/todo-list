import { Box, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import useTodo from "../../hooks/useTodo";
function Header() {
  const [searchKey, setSearchKey] = useState("");
  const debounceValue = useDebounce(searchKey);
  const { originTodos, setTodos } = useTodo();

  useEffect(() => {
    console.log(originTodos);
    if (debounceValue && debounceValue.trim() === "") return;

    const todosFilter = originTodos.filter((ele) =>
      ele.todoName
        .toString()
        .toLowerCase()
        .includes(debounceValue.toString().trim().toLowerCase())
    );
    setTodos(todosFilter);

  }, [debounceValue]);

  return (
    <Box sx={{ height: "64px", mt: 3 }}>
      <Stack
        sx={{ height: "100%" }}
        gap={1}
        direction="row"
        alignItems="center"
      >
        <SearchIcon style={{ color: "#a3a3a3" }} />
        <InputBase
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          sx={{ border: "none", outline: "none", fontSize: "18px" }}
          placeholder="Search"
          size="small"
        />
      </Stack>
    </Box>
  );
}

export default Header;
