import React, { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Badge } from 'reactstrap';

import { CounterContext } from './../App';

import ComponentC from './ComponentC';

function ComponentB() {
	const counterContext = useContext(CounterContext);
	console.log(counterContext);
	const {counter,dispatch} = counterContext;
  return (
    <div className="ComponentB">
	    <ButtonGroup>
		      <Button color="primary">
		      ComponentB Counter: <Badge color="secondary">{counter}</Badge>
		      </Button>
	      </ButtonGroup>
		    <p></p>
		    <ButtonGroup>
		      <Button onClick={()=>dispatch({type:"increment", payload:1})}>Increment</Button>
		      <Button onClick={()=>dispatch({type:"decrement", payload:1})}>Decrement</Button>
		      <Button onClick={()=>dispatch({type:"reset"})} color={"danger"}>Reset</Button>
		    </ButtonGroup>
		    <p></p>
		    <ComponentC/>
    </div>
  );
}

export default ComponentB;
