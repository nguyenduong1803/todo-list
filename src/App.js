// import Todos from "./components/Todos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "./themes";
import Todo from "./components/Todos";
import { TodoProvider } from "./contexts/todo.context";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <MainLayout>
          <Todo />
        </MainLayout>
      </TodoProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
