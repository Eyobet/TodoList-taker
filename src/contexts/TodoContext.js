import { useContext, createContext } from 'react';

// Create the context
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "todo message",
      isCompleted: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleTodo: (id) => {},
});

// Create a custom hook for using the context
export const useTodo = () => {
  return useContext(TodoContext);
};

// Export the provider correctly
export const TodoProvider = TodoContext.Provider;
