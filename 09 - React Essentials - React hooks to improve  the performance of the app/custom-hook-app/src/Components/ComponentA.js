import { useState } from 'react';
import {Button, ButtonGroup, Badge} from 'reactstrap';

import useCounter from './../custom-hook/useCounter';

function ComponentA() {
  const [count, increment, decrement,reset] = useCounter(0,5);

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

export default ComponentA;
