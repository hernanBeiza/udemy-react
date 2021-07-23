# 09 - React Essentials - React hooks to improve  the performance of the app

## 48 useEffect fetch data with axios

- Instalar axios 

````
npm install axios
````

- Importar axios en app component

```jsx
import axios from 'axios';
```

- Implementar useEffect + axios para obtener la data al cargar el componente App

````jsx
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
  const [cards, setCards] = useState([]);

  //Cargar data usando axios
  useEffect(() =>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res=>{
      console.log(res.data);
      setCards(res.data);
    })
  },[]);
  //Si no se pasa parámetro, hará el request múltiples veces

  const toggleShowCardHandler = () => setShowCard(!showCard);
  const deleteCardHandler = (cardIndice) => {
    //Es necesario ... para poder re renderar la vista
    const cardsCopy = [...cards];
    cardsCopy.splice(cardIndice,1);

    console.log(cards,cardsCopy);
    setCards(cardsCopy);
  }
  const changeNameHandler = (event,cardIndice) => {
    //1 Obtener la tarjeta a modificar
    const indexEncontrado = cards.findIndex(itemCard=>itemCard.id==cardIndice);
    //2 Crear una copia de las tarjetas
    const cardsCopy = [...cards];
    //3 Cambiar el nombre de la tarjeta
    cardsCopy[indexEncontrado].name = event.target.value;
    //4 Actualizar tarjetas
    setCards(cardsCopy);
  }

  const buttonsMarkup = (
    <div>
    <button className="button button2">Yes</button>
    <button className="button button3">No</button>
    </div>
    )

  const classes = ["button"];

  if (cards.length<3) classes.push("pink");
  if (cards.length<2) classes.push("red");  

  const cardMarkup = (
    showCard && (
      cards.map ((card,index)=><Card 
        name={card.name} 
        phone={card.phone}
        key ={card.id}
        onDelete={() => deleteCardHandler(index)}
        onChangeName={(event) => changeNameHandler(event,card.id)}
        />
        )
      )
    )
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Button color="primary" length={cards.length}>Toggle</Button>
    <button className={classes.join(" ")} onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
    {cardMarkup}
    </div>
    </ThemeProvider>
    );
}

export default App;
````

### Recordar de useEffect

- Si se pasa un arreglo vacío, useEffect se ejecutará una vez
- Si un valor del arreglo de dependencias cambia("[nombre]"), useEffect se ejecutará cuando la dependencia cambie, o valor de "nombre" cambie
- useEffect se ejecutará en cada re render si no se pasa arreglo de dependencias

## 49
