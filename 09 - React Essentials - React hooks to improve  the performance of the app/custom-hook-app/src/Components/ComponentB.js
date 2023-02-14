import { useState } from 'react';
import {Button, ButtonGroup, Badge} from 'reactstrap';

function ComponentB() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount)=>prevCount+1);
  }

  const decrement = () => {
    setCount((prevCount)=>prevCount-1);
  };

  const reset = () => {
    setCount(0)
  };

  return (
    <div className="App">
    <ButtonGroup>
      <Button color="primary" outline>Component Counter <Badge color="primary">{count}</Badge></Button>
    </ButtonGroup>
    <br/>
    <br/>

    <ButtonGroup>
      <Button color="primary" onClick={increment}>Increment</Button>
      <Button color="primary" onClick={decrement}>Decrement</Button>
      <Button color="danger" onClick={reset}>Reset</Button>
    </ButtonGroup>
    </div>
    );
}

export default ComponentB;
