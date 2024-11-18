import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { FiPlus } from "react-icons/fi";

function TodoForm() {
  const [writing, setWriting] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (writing.trim() === "") {
      return;
    }
    addTodo(writing);
    setWriting("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write a todo..."
        value={writing}
        onChange={(e) => setWriting(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-r-lg px-4 py-2 bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
      >
        <FiPlus className="text-lg" />
      </button>
    </form>
  );
}

export default TodoForm;
