import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Badge } from 'reactstrap';

const initialState = {
	counter:0
}
const reducer = (state,action)=>{
	console.log(state,action);
	switch(action.type){
		case "increment":
		return {...state, counter:state.counter + action.payload};
		case "decrement":
		return {...state, counter:state.counter - action.payload};
		case "reset":
		return initialState;
		default:
		return state;
	}
}

function Counter() {
	const [state1,dispatch1] = useReducer(reducer,initialState);
	const [state2,dispatch2] = useReducer(reducer,initialState);

  return (
    <div className="Counter">
	    <ButtonGroup>
	      <Button color="primary">
	      Counter1: <Badge color="secondary">{state1.counter}</Badge>
	      </Button>
	      <Button color="primary">
	      Counter2: <Badge color="secondary">{state2.counter}</Badge>
	      </Button>
      </ButtonGroup>
	    <p></p>
	    <ButtonGroup>
	      <Button onClick={()=>dispatch1({type:"increment", payload:1})}>Increment</Button>
	      <Button onClick={()=>dispatch1({type:"decrement", payload:1})}>Decrement</Button>
	      <Button onClick={()=>dispatch1({type:"reset"})} color={"danger"}>Reset</Button>
	    </ButtonGroup>
	    <p></p>
	    <ButtonGroup>
	      <Button onClick={()=>dispatch2({type:"increment", payload:1})}>Increment</Button>
	      <Button onClick={()=>dispatch2({type:"decrement", payload:1})}>Decrement</Button>
	      <Button onClick={()=>dispatch2({type:"reset"})} color={"danger"}>Reset</Button>
	    </ButtonGroup>
	    <p></p>
    </div>
  );
}

export default Counter;
