import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect,useMemo} from 'react';

import ComponentA from './components/ComponentA';
import ComponentB from './components/ComponentB';

function App() {
  const [contadorA, setContadorA] = useState(0);
  const [contadorB, setContadorB] = useState(0);
  
  const incrementarA = () => {
    setContadorA(contadorA+1);
  };
  const incrementarB = () => {
    setContadorB(contadorB+1);
  };
  
  const memoComponentA = useMemo(() => {
    return <ComponentA count={contadorA}/>;
  },[contadorA]);
  
  return (
    <div className="App">
      <p>
        <code>App.js contadorA: {contadorA}</code>
      </p>
      <p>
        <code>App.js contadorB: {contadorB}</code>
      </p>
      <p>
        <button onClick={incrementarA}>IncrementarA</button>
      </p>
      <p>
        <button onClick={incrementarB}>Incrementar B</button>
      </p>
      <p>
        {memoComponentA}
      </p>
      <p>
        <ComponentB count={contadorB}/>
      </p>
    </div>
  )
}

export default App;
