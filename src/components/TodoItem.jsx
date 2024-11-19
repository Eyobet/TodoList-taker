import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import PropTypes from 'prop-types'
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";

function TodoItem({ todo }) {
  const [isTodoEditable, setisTodoEditable] = useState(false);
  const [todoMsg, settodoMsg] = useState(todo.todo);
  const { deleteTodo, updateTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setisTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 mb-3 text-white rounded-lg shadow-lg ${
        todo.isCompleted
          ? "bg-blue-500 line-through"
          : "bg-gray-600 hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={toggleCompleted}
          className="w-5 h-5 mr-3 rounded focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          className={`flex-grow bg-transparent outline-none ${
            isTodoEditable ? "border-b-2 border-white" : "border-transparent"
          }`}
          value={todoMsg}
          onChange={(e) => settodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            if (todo.isCompleted) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setisTodoEditable((prev) => !prev);
            }
          }}
          className="p-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          {isTodoEditable ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <PencilIcon className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}


       TodoItem.propTypes = {
         todo: PropTypes.shape({
          id: PropTypes.number.isRequired,       // Ensures 'id' is a number
         todo: PropTypes.string.isRequired,     // Ensures 'todo' is a string
         isCompleted: PropTypes.bool.isRequired // Ensures 'isCompleted' is a boolean
             }).isRequired, // Ensures the 'todo' prop is provided
                    };

 export default TodoItem;
