import { createContext, useEffect, useRef, useState } from "react";
import { addTodo, deleteTodo, getData, updateTodo } from "../utils/firebase";
import { format } from "date-fns";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const refOriginTodos = useRef([]);

  // tìm kiếm công việc sau đó truyền todo mới ghì đè lên todo cũ và lưu
  const handleFindAndUpdateTodos = (todoId, newValue) => {
    setTodos((prev) => {
      const newTodoList = prev.map((todo) => {
        if (todo.id === todoId) {
          const newTodo = { ...todo, ...newValue };
          updateTodo(todoId, newTodo);
          return newTodo;
        }
        return todo;
      });
      refOriginTodos.current = newTodoList;
      return newTodoList;
    });
  };

  // xử lý thêm todo mới
  const handleAddTodo = async (todoName, color) => {
    const originalDate = new Date();
    const date = format(originalDate, "MMM, dd, yyyy");

    const newTodo = {
      date,
      todoName,
      color,
      markAsStarred: false,
    };
    await addTodo(newTodo);
    await fetchTodos();
  };

  //handleRemoveTodo
  const handleRemoveTodo = async (todoId) => {
    await deleteTodo(todoId);
    setTodos((prev) => {
      const todoIndex = prev.findIndex((todo) => todo.id === todoId);
      prev.splice(todoIndex, 1);
      return [...prev];
    });
  };

  const fetchTodos = async () => {
    const data = await getData();
    setTodos(data);
    refOriginTodos.current = data;
  };

  // fetch todo khi component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        originTodos: refOriginTodos.current,
        setTodos,
        handleFindAndUpdateTodos,
        handleAddTodo,
        handleRemoveTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
export { TodoContext as default, TodoProvider };
