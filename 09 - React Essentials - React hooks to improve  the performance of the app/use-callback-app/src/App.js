import React, {useCallback, useState} from 'react';
import './App.css';

const functionCounter = new Set();

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment = () => {
    setCount(count+1);
  }

  const increment2 = useCallback(() => {
    setCount2(count2+1);
  },[count2]);

  functionCounter.add(increment);
  functionCounter.add(increment2);
  console.log(functionCounter);


  return (
    <div className="App">
    <p>Count: {count} Count2: {count2}</p>
    <button onClick={increment}>Incrementar contador</button>
    <button onClick={increment2}>Incrementar contador 2</button>
    </div>
  );
}

export default App;
