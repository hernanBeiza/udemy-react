# Sección 6 - React Essentials - List

## 31 Rendering a list of cards

- En el componente hijo, Cards, se agrega un botón para eliminar
- Se elimina el input
- Se elimina el uso de children

- En el componente padre, App, crear un array de cards y usar la función map

```jsx
import { useState } from 'react';

import './App.css';

import faker from 'faker';

import Card from './Card/Card';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [cards, setCards] = useState([
    { name:"Victor", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { name:"Marcus", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { name:"Jaco", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" }
  ]);

  const toggleShowCardHandler = () => setShowCard(!showCard);

  const buttonsMarkup = (
    <div>
    <button className="button button2">Yes</button>
    <button className="button button3">No</button>
    </div>
    )

  const cardMarkup = (
    showCard && (
      cards.map (card=><Card 
        name={card.name} 
        jobTitle={card.title} 
        avatar={card.avatar}/>
      )
    )
  )
    return (
      <div className="App">
      <button onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
      {cardMarkup}
      </div>
      );
  }

  export default App;
```

## 32 Delete a specific card

- Crear una función en el componente padre para manejar el borrado

- Duplicar el arreglo origina, crear una copia, clonar, usando ...
- Eliminar la tarjeta del arreglo cardsCopy
- Actualizar el state usando setCards(cardsCopy);

```jsx
import { useState } from 'react';

import './App.css';

import faker from 'faker';

import Card from './Card/Card';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [cards, setCards] = useState([
    { name:"Victor", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { name:"Marcus", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { name:"Jaco", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" }
  ]);

  const toggleShowCardHandler = () => setShowCard(!showCard);
  const deleteCardHandler = (cardIndice) => {
    //Es necesario ... para poder re renderar la vista
    const cardsCopy = [...cards];
    cardsCopy.splice(cardIndice,1);

    console.log(cards,cardsCopy);
    setCards(cardsCopy);
  }

  const buttonsMarkup = (
    <div>
    <button className="button button2">Yes</button>
    <button className="button button3">No</button>
    </div>
    )

  const cardMarkup = (
    showCard && (
      cards.map ((card,index)=><Card 
        name={card.name} 
        jobTitle={card.title} 
        avatar={card.avatar}
        onDelete={() => deleteCardHandler(index)}
        />
      )
    )
  )
    return (
      <div className="App">
      <button onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
      {cardMarkup}
      </div>
      );
  }

  export default App;

```

- Componente hijo llamar a la función del componente padre

```jsx
import './Card.css';

function Card(props) {
  console.log(props);

  return (
    <div className="Card">
    <div className="card">
    <img src={props.avatar} alt="Avatar" style={{width:'100%'}}/>
    <div className="container">
    <h4><b>{props.name}</b></h4>
    <p>{props.jobTitle}</p>
    <p><button onClick ={props.onDelete} className="button button-red">Delete</button></p>
    </div>
    </div>
    </div>
    );
}

export default Card;

```



## 33 Fix unique key error

- Cada elemento de una lista debe tener una llave, un índice para identificarlo

- No se puede usar el índice del arreglo, porque puede cambiar por otros motivos.
- Se recomienda usar un index, id, un índice propio en el objeto referenciado

```jsx
import { useState } from 'react';

import './App.css';

import faker from 'faker';

import Card from './Card/Card';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [cards, setCards] = useState([
    { index:100, name:"Victor", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { index:200,  name:"Marcus", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
    { index:300,  name:"Jaco", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" }
  ]);

  const toggleShowCardHandler = () => setShowCard(!showCard);
  const deleteCardHandler = (cardIndice) => {
    //Es necesario ... para poder re renderar la vista
    const cardsCopy = [...cards];
    cardsCopy.splice(cardIndice,1);

    console.log(cards,cardsCopy);
    setCards(cardsCopy);
  }

  const buttonsMarkup = (
    <div>
    <button className="button button2">Yes</button>
    <button className="button button3">No</button>
    </div>
    )

  const cardMarkup = (
    showCard && (
      cards.map ((card,index)=><Card 
        name={card.name} 
        jobTitle={card.title} 
        avatar={card.avatar}
        key ={card.index}
        onDelete={() => deleteCardHandler(index)}
        />
      )
    )
  )
    return (
      <div className="App">
      <button onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
      {cardMarkup}
      </div>
      );
  }

export default App;
```



## 34 Change the name of a specific card

- Agregar al componente hijo, Card, un input text
- El input text ejecuta una función que el padre tiene para actualizar según el id de la tarjetra



```jsx
import './Card.css';

function Card(props) {
  console.log(props);

  return (
    <div className="Card">
    <div className="card">
    <img src={props.avatar} alt="Avatar" style={{width:'100%'}}/>
    <div className="container">
    <h4><b>{props.name}</b></h4>
    <p>{props.jobTitle}</p>
    <p><input type="text" onChange={props.onChangeName} value={props.name}/></p>
    <p><button onClick ={props.onDelete} className="button button-red">Delete</button></p>
    </div>
    </div>
    </div>
    );
}

export default Card;
```

- En el componente padre, App, busca por el id de la tarjeta y actualiza el nombre

```jsx
import { useState } from 'react';

import './App.css';

import faker from 'faker';

import Card from './Card/Card';

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
    <div className="App">
    <button onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
    {cardMarkup}
    </div>
    );
}

export default App;
```

