import React, { useReducer } from "react";
import { MdDelete } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";

import "./TodoList.css";

const initialState = {
	todos: [],
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case "Add_Todo":
			return {
				todos: [
					...state.todos,
					{ text: action.payload, completed: false },
				],
			};
		case "Toggle_Todo":
			return {
				todos: state.todos.map((todo) =>
					todo.text === action.payload
						? { ...todo, completed: !todo.completed }
						: todo
				),
			};
		case "Remove_Todo":
			return {
				todos: state.todos.filter(
					(todo) => todo.text !== action.payload
				),
			};
		default:
			return state;
	}
};

const TodoList = () => {
	const [state, dispatch] = useReducer(
		todoReducer,
		initialState
	);

	const addTodo = (todo) => {
		dispatch({ type: "Add_Todo", payload: todo });
	};

	const toggleTodo = (todo) => {
		dispatch({ type: "Toggle_Todo", payload: todo });
	};

	const removeTodo = (todo) => {
		dispatch({ type: "Remove_Todo", payload: todo });
	};

	return (
		<div className='container flex flex-column flex-c'>
			<h2 className='ls-2 fs-26'>Todo List</h2>
			<form
				className=' form flex flex-c ls-1 fs-15 p-1'
				onSubmit={(e) => {
					e.preventDefault();
					const todo = e.target.elements.todo.value;
					{
						todo
							? addTodo(todo)
							: alert("please Type your task");
					}
					e.target.reset();
				}}
			>
				<label
					htmlFor='todo'
					className='p-1'
				>
					Add your Task:{" "}
				</label>
				<input
					type='text'
					id='todo'
				/>
				<button
					type='submit'
					className='bnt p-1 fs-16 fw-4'
				>
					<MdOutlineAddCircle /> Add Task
				</button>
			</form>

			<ul className='p-1'>
				{state.todos.map((todo, index) => (
                    <li
                        className="line"
						key={index}
						style={{
							textDecoration: todo.completed
								? "line-through"
								: "none",
							color: todo.completed
								? "var(--pink-color)"
								: "var(--dark-grey-color)",
						}}
					>
						<button
							onClick={() => toggleTodo(todo.text)}
							className='right-btn'
						>
							{todo.completed ? (
								<MdCheckBox />
							) : (
								<MdCheckBoxOutlineBlank />
							)}
						</button>
						<p className='p'>{todo.text}</p>
						<button
							onClick={() => removeTodo(todo.text)}
							className='left-btn'
						>
							<MdDelete />
						</button>
                    </li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
