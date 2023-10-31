import React, { useReducer, useState } from 'react'

const ACTIONS = {
  ADD_TODO: 'add_todo',
  DELETE_TODO :'delete_todo'
}

const newTodo = (name) => {
  return{id: Date.now() , name:name , complete : false}
 }
const reducer = (todos , action) => {
 switch(action.type){
  case ACTIONS.ADD_TODO:
    return [...todos , newTodo(action.payLoad.name)]
  case ACTIONS.DELETE_TODO:
    return todos.filter(todo => todo.id !== action.payLoad.id)
  default:
    return todos

 }
}

const Todo = () => {
 

 
    const [name , setName]=useState('')
    const [todos , dispatch]=useReducer(reducer , [])
    const handleSubmit = (e)=>{
      e.preventDefault()
      dispatch({type:ACTIONS.ADD_TODO , payLoad:{name:name}})
      setName('')
    }
    console.log(todos)
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
        </form>
        {todos.map(todo =>(
          <div key={todo.id}>
            <h1>{todo.name}</h1>
           <button onClick={()=>dispatch({type : ACTIONS.DELETE_TODO , payLoad: {id: todo.id}})}>Delete</button>
          </div>
        ) )} 
    </div>
  )
}

export default Todo