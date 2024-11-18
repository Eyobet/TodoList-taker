import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import PropTypes from 'prop-types';
import { FiEdit, FiTrash2, FiCheckCircle } from "react-icons/fi";

                    function TodoItem({ todo }) {
                    const [isTodoEditable, setIsTodoEditable] = useState(false);
                    const [todoMsg, setTodoMsg] = useState(todo.todo);
                    const { deleteTodo, updateTodo, toggleTodo } = useTodo();

                    const editTodo = () => {
                        updateTodo(todo.id, { ...todo, todo: todoMsg });
                        setIsTodoEditable(false);
                    };

                    const toggleCompleted = () => {
                        toggleTodo(todo.id);
                    };

                    return (
                        <div
                        className={`flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 ${
                            todo.isCompleted ? "bg-green-100" : "bg-white"
                        }`}
                        >
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={toggleCompleted}
                            className="h-5 w-5 mr-2 cursor-pointer"
                        />
                        <input
                            type="text"
                            className={`border-none outline-none flex-grow bg-transparent rounded-lg px-2 ${
                            isTodoEditable ? "bg-gray-100" : "cursor-default"
                            }`}
                            value={todoMsg}
                            onChange={(e) => setTodoMsg(e.target.value)}
                            readOnly={!isTodoEditable}
                        />
                        <button
                            onClick={() => {
                            if (todo.isCompleted) return;
                            if (isTodoEditable) {
                                editTodo();
                            } else setIsTodoEditable((prev) => !prev);
                            }}
                            className="text-blue-500 px-2 py-1 hover:text-blue-600"
                        >
                            {isTodoEditable ? <FiCheckCircle /> : <FiEdit />}
                        </button>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 px-2 py-1 hover:text-red-600"
                        >
                            <FiTrash2 />
                        </button>
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
