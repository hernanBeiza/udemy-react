import { useState } from 'react';

import './App.css';

import faker from 'faker';

import Card from './Card/Card';

function App() {
  const [name, setName] = useState("Alan Smith");
  const [showCard, setShowCard] = useState(true);

  const changeNameHandler = (nombre) => setName(nombre);

  const changeInputHandler = (event) => setName(event.target.value);

  const toggleShowCardHandler = () => setShowCard(!showCard);

  const buttonsMarkup = (
    <div>
    <button className="button button2">Yes</button>
    <button className="button button3">No</button>
    </div>
    )

  const cardMarkup = (
    showCard &&
    <Card 
    onChangeName={()=>changeNameHandler("Victor Wooten")} 
    onChangeInput={changeInputHandler} 
    name={name} 
    jobTitle="National Infrastructure Supervisor" avatar="https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg">
    {buttonsMarkup}
    </Card>
  )
  return (
    <div className="App">
    <button onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
    {cardMarkup}
    </div>
    );
}

export default App;
