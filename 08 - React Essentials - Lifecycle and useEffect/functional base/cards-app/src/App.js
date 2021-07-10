import { useState } from 'react';

import './App.css';

import { ThemeProvider } from 'styled-components';

import Card from './Card/Card';
import Button from './element/Button';

const theme = {
  primary: '#4CAF50',
  mango:'yellow'
}

function App() {
  const [showCard, setShowCard] = useState(true);
  const [cards, setCards] = useState([
    { id:100, name:"Victor", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { id:200,  name:"Marcus", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { id:300,  name:"Jaco", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" }
    ]);

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
        jobTitle={card.title} 
        avatar={card.avatar}
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
