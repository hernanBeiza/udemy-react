import logo from './logo.svg';
import './App.css';

import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const initialState = {
  loading:true,
  error:"",
  todos:[]
}

const reducer = (state,action) =>{
  switch (action.type) {
    case 'SET_DATA':
      return {
        loading:false,
        error:"",
        todos:action.payload
      }
    break;
    case 'SET_ERROR':
      return {
        loading:false,
        error:"Error encontrado",
        todos:[]
      }
    break;
    default:
    return state;
  }
}

function App() {
  const[state,dispatch]= useReducer(reducer,initialState);
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(res=>{
      console.log(res.data);
      dispatch({type:"SET_DATA",payload:res.data})
    })
    .catch(err=>{
      dispatch({type:"SET_ERROR"})
    })
  },[]);

  let listMarkup = (
    <ListGroup>
    {state.todos.map(itemTodo=><ListGroupItem key={itemTodo.id}>{itemTodo.title} {itemTodo.completed === true ? (<Badge color="success">Complete</Badge>) : (<Badge color="danger">Incomplete</Badge>)}</ListGroupItem>)}
    </ListGroup>
  )

  return (
    <div className="App">
    {state.loading ? 'Loading' : (state.error ? state.error : listMarkup)}
    </div>
  );
}

export default App;
