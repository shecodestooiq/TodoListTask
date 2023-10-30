import { useReducer, useState } from "react";

const initialState = [];

const ToDoListUseReducer = () => {
  const toDoListReducer = (list, action) => {
    switch (action.type) {
      case "add":
        return [
          ...list,
          { id: list.length, task: action.item, checked: false },
        ];
      case "delete":
        return list.filter((task) => task.id !== action.id);
      case "check":
        return list.map((task) => {
          if (task.id === action.id) {
            return { ...task, checked: !task.checked };
          }
          return task;
        });
      default:
        return list;
    }
  };

  const [list, listDispatcher] = useReducer(toDoListReducer, initialState);
  const [item, setItem] = useState("");

  const handleInput = (e) => {
    setItem(e.target.value);
  };
  const addItem = () => {
    if (item.trim() !== "") {
      listDispatcher({ type: "add", item });
      setItem("");
    }
  };

  return (
    <>
      <div className="titleContainer">
        <h2>To-Do List</h2>
        <h4>Using "UseReducer" hook</h4>
      </div>

      <div className="tasksList">
        <div className="btnContainer">
          <input
            type="text"
            onChange={handleInput}
            value={item}
            placeholder="Add task..."
          />
          <button onClick={addItem} className="addBtn">
            +
          </button>
        </div>
        <ul>
          {Object.keys(list).length === 0 ? (
            <p>No tasks yet!</p>
          ) : (
            list.map((task) => (
              <div
                className="listContainer"
                key={task.id}
                style={{
                  background: task.checked
                    ? "rgb(221, 252, 242)"
                    : "rgb(252, 250, 221)",
                }}
              >
                <label
                  style={{
                    textDecorationLine: task.checked ? "line-through" : "none",
                    color: task.checked ? "#0275FF" : "black",
                  }}
                >
                  <input
                    type="checkbox"
                    key={task.id}
                    checked={task.checked}
                    onChange={() =>
                      listDispatcher({ type: "check", id: task.id })
                    }
                  />
                  {task.task}
                </label>
                <button
                  onClick={() =>
                    listDispatcher({ type: "delete", id: task.id })
                  }
                >
                  <img
                    src="https://file.rendit.io/n/6I3mnh28TkxsyaS9kUsX.svg"
                    alt="dlt"
                  />
                </button>
              </div>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default ToDoListUseReducer;
