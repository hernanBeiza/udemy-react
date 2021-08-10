import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Badge } from 'reactstrap';

const initialState = {
	counter1:0,
	counter2:10
}
const reducer = (state,action)=>{
	console.log(state,action);
	switch(action.type){
		case "increment":
		return {...state, counter1:state.counter1 + action.payload};
		case "decrement":
		return {...state, counter1:state.counter1 - action.payload};
		case "increment2":
		return {...state, counter2:state.counter2 + action.payload};
		case "decrement2":
		return {...state, counter2:state.counter2 - action.payload};
		case "reset":
		return initialState;
		default:
		return state;
	}
}

function Counter() {
	const [count,dispatch] = useReducer(reducer,initialState);

  return (
    <div className="Counter">
	    <ButtonGroup>
	      <Button color="primary">
	      Counter1: <Badge color="secondary">{count.counter1}</Badge>
	      </Button>
	      <Button color="primary">
	      Counter2: <Badge color="secondary">{count.counter2}</Badge>
	      </Button>
      </ButtonGroup>
	    <p></p>
	    <ButtonGroup>
	      <Button onClick={()=>dispatch({type:"increment", payload:1})}>Increment</Button>
	      <Button onClick={()=>dispatch({type:"decrement", payload:1})}>Decrement</Button>
	    </ButtonGroup>
	    <p></p>
	    <ButtonGroup>
	      <Button onClick={()=>dispatch({type:"increment2", payload:5})}>Increment counter 2</Button>
	      <Button onClick={()=>dispatch({type:"decrement2", payload:5})}>Decrement counter 2</Button>
	    </ButtonGroup>
	    <p></p>
	    <ButtonGroup>
	      <Button onClick={()=>dispatch({type:"reset"})} color={"danger"}>Reset</Button>
	    </ButtonGroup>
    </div>
  );
}

export default Counter;
