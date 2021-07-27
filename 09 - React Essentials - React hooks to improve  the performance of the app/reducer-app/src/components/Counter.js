import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup } from 'reactstrap';

const initialState = 0;
const reducer = (state,action)=>{
	console.log(state,action);
	switch(action){
		case "increment":
		return state+1;
		case "decrement":
		return state-1;
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
    	<div>{count}</div>
	    <ButtonGroup>
	      <Button onClick={()=>dispatch("increment")}>Increment</Button>
	      <Button onClick={()=>dispatch("decrement")}>Decrement</Button>
	      <Button onClick={()=>dispatch("reset")} color={"danger"}>Reset</Button>
	    </ButtonGroup>
    </div>
  );
}

export default Counter;
