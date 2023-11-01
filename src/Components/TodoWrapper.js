import React, { useReducer } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

const initialState = {
  todos: [],
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          { id: uuidv4(), task: action.task, completed: false },
        ],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "TOGGLE_COMPLETE":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "EDIT_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, task: action.task } : todo
        ),
      };
    default:
      return state;
  }
}

export const TodoWrapper = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (task) => {
    dispatch({ type: "ADD_TODO", task });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  const toggleComplete = (id) => {
    dispatch({ type: "TOGGLE_COMPLETE", id });
  };

  const editTodo = (id) => {
    dispatch({ type: "EDIT_TODO", id });
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
 
      {state.todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTodo} task={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            editTodo={() => editTodo(todo.id)}
            toggleComplete={() => toggleComplete(todo.id)}
          />
        )
      )}
    </div>
  );
};
