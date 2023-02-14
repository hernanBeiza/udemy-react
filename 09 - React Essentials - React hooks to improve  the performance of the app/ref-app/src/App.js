import React,{useRef,useState} from 'react';
import './App.css';

import Component from './components/Component';


function App() {
  const [show, setShow] = useState();
  const inputRef = useRef();

  return (
    <div className="App">
    <input ref ={inputRef} type="text"/>
    <input type="text"/>
    <button type="button" onClick={()=>{
      inputRef.current.focus()}
    }>Cambiar foco al primero</button>
    <p></p>
    <button onClick={()=>setShow(!show)}>Toggle components</button>
    <h1>Unmounted component</h1>
    {show && <Component/>}
    </div>
  );
}

export default App;
