import { useContext } from "react";
import TodoContext from "../contexts/todo.context";
export default function useTodo() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("Forgot to wrap component in todoContext");
  }
  return todoContext;
}
