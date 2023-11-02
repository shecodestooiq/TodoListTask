import React, { useReducer } from "react";

function UseReducerToDoList() {
  const listReducer = (listState, action) => {
    switch (action.type) {
      case "add":
        return [...listState, action.payload];
      case "remove":
        return listState.filter((_, index) => index !== action.payload);
      default:
        return listState;
    }
  };
  const [listState, dispatchList] = useReducer(listReducer, []);

  const handleAdd = () => {
    const newItem = prompt("Enter new item");
    dispatchList({ type: "add", payload: newItem });
  };

  const handleRemove = (index) => {
    dispatchList({ type: "remove", payload: index });
  };

  return (
    <div>
      <button onClick={handleAdd}>Add Item</button>
      {listState.map((item, index) => (
        <div key={index}>
          {item}
          <button onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default UseReducerToDoList;
