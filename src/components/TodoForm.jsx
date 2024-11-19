import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { PlusCircleIcon } from "@heroicons/react/outline"

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
    <div className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
      <form
        onSubmit={add}
        className="flex items-center justify-between space-x-2"
      >
        <input
          type="text"
          placeholder="Write a todo..."
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          className="flex-grow p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="flex items-center px-4 py-2 space-x-1 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
