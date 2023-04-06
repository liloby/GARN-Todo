import { Box } from "@mui/material";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <Box
      sx={{
        padding: "5rem",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "2rem",
        color: "#454545",
      }}
      className="App animate"
    >
      <h1>Todo App</h1>
      <TodoList />
    </Box>
  );
}

export default App;
