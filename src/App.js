import { useReducer, useState } from 'react';
import './index.css';

function App() {
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addToDo':
        return [...state, { text: action.text, completed: false }];
      case 'deleteToDo':
        return state.filter((_, index) => index !== action.index);
      case 'toggleFinished':
        return state.map((todo, index) =>
          index === action.index
            ? { ...todo, completed: !todo.completed }
            : todo
        );

      default:
        return state

    }
  }


  const [todos, dispatch] = useReducer(reducer, []);
  const [newTodo, setNewTodo] = useState('');

  const handleAddToDo = () => {
    if (newTodo.trim() !== '') {
      dispatch({ type: 'addToDo', text: newTodo });
      setNewTodo('');
    }
  };
  return <div className="App">
  Todo List task
  <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddToDo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'green' : 'red',
              }}
            >
              {todo.text}
            </span>
            <button className='
            ' onClick={() => dispatch({ type: 'toggleFinished', index })}>
              {todo.completed ? 'Unfinish' : 'Finish'}
            </button>
            <button className='rbtn' onClick={() => dispatch({ type: 'deleteToDo', index })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
  </div>;
}

export default App;
