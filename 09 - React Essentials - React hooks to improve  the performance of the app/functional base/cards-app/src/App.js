import { useState, useEffect } from 'react';

import './App.css';

import { ThemeProvider } from 'styled-components';
import  axios from 'axios';

import Card from './Card/Card';
import Button from './element/Button';

const theme = {
  primary: '#4CAF50',
  mango:'yellow'
}

function App() {
  const [showCard, setShowCard] = useState(true);
  const [id, setId] = useState(1);
  const [card, setCard] = useState([]);

  useEffect(() =>{
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res=>{
      console.log(res.data);
      setCard(res.data);
    })
  },[id]);
  //Si no se pasa parámetro, hará el request múltiples veces

  const toggleShowCardHandler = () => setShowCard(!showCard);


  const changeNameHandler = (event,cardIndice) => {
    //1 Crear una copia de las tarjetas
    const cardCopy = {...card};
    //2 Cambiar el nombre de la tarjeta
    cardCopy.name = event.target.value;
    //3 Actualizar tarjetas
    setCard(cardCopy);
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <div className="inputBox">
    <input type="text" value={id} onChange={e =>setId(e.target.value)}/>
    </div>
    <Card 
        name={card.name} 
        phone={card.phone}
        key ={card.id}
        onChangeName={(event) => changeNameHandler(event,card.id)}
        />
    </div>
    </ThemeProvider>
    );
}

export default App;
