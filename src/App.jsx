import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoMessage) => {
    setTodos((prev) => [
      { id: Date.now(), todo: todoMessage, isCompleted: false },
      ...prev,
    ]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
          <h1 className="text-2xl font-bold text-center mb-5 text-blue-600">
            Todo List
          </h1>
          <TodoForm />
          <div className="mt-4 space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
