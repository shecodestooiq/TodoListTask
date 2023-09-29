import React, { useState, useReducer } from "react";

const init = 
  {
    todos: [],
    id:1,
  };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: [...state.todos.filter((item) => item.id !== action.payload)],
      };

    default:
      return state;
  }
};

export default function Todo() {
  const [text, setText] = useState('');
  const [state, dispatch] = useReducer(reducer, init);

  const handleADD = () => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        id:Math.random(),
        text,
      },
    });
    setText("");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };
  console.log(state.todos);

  return (
    <div>
      <input
        type="text"
        value={text}
        name={text}
        placeholder="task to do"
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={handleADD}>ADD</button>

      <ul>
        {state.todos.map((item, i) => {
          return (
            <>
              <li key={i}>{item.text}</li>
              <button onClick={() => handleDelete(item.id)}>delete</button>
            </>
          );
        })}
      </ul>
    </div>
  );
}

