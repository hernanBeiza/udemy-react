# Sección 7 - React Essentials - Styles

## 35 Dynamic style with javascript

- En el componente padre, Apps, se crea un objeto json con las propiedades a modificar
- Las propiedades se modifican en el código

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

  const buttonStyle = {
    backgroundColor: null
  }
  if (cards.length<3) buttonStyle.backgroundColor = "lightpink";
  if (cards.length<2) buttonStyle.backgroundColor = "red";      

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
    <button style={buttonStyle} onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
    {cardMarkup}
    </div>
    );
}

export default App;

```

## 36 Dynamic style with classes

- Agregar los estilos al archivos CSS

```css
.text {
	font-weight:bold;
	color:black;	
}
.pink {
  background-color:pink
}
.red {
  background-color:red
}
```



- Modificar la lógica para agregar los nombres de las clases al arreglo

````jsx
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

	const classes = ["button"]
  
  if (cards.length<3) classes.push("pink");
  if (cards.length<2) classes.push("red text");  

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
    <button className={classes.join(" ")} onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
    {cardMarkup}
    </div>
    );
}

export default App;


````

## 37 Styled Component

- Instalar styled-component usando

```
npx install styled-components
```

- Importar en el componente principal

```
import styled from 'faker';

```

- Y crear una constante para almacenar el código css del botón

````
const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`
````

- Usar la constante en el área de render de JSX

````jsx
  return (
    <div className="App">
    <Button length={cards.length}>Toggle</Button>
    <button className={classes.join(" ")} onClick={()=>toggleShowCardHandler()}>Toggle Show/Hide</button>
    {cardMarkup}
    </div>
    );
````

- Se puede condicionar el estilo del botón usando las propiedades props pasadas al componente

```jsx
const Button = styled.button`
  background-color: ${props=>props.length>2 ? '#4CAF50' : props.length<2 ? 'red':'pink'};
  border: none;
  color: ${props=>props.length<=1 ? "black":"white"};
  font-weight: ${props=>props.length<=1 ? "bold":"normal"};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`
```

## 38 Theme

- Theme provider
- Aplicar un theme a todos los componentes
- Importar ThemeProvider de Styled componentes
- Crear una constante para guardar los estilos y configuraciones de colores
- Y rodear todo el código de la aplicación en el área de render con ThemeProvider
- 



````jsx
import { useState } from 'react';

import './App.css';

import styled, { ThemeProvider, css } from 'styled-components';

import Card from './Card/Card';

const theme = {
  primary: '#4CAF50',
  mango:'yellow'
}

const Button = styled.button`
  border: none;
  ${props =>
    props.color && css`
  background-color: ${props => props.length > 2 ? props.theme[props.color] : props.length < 2 ? 'red' : 'pink'};
  color: ${props => props.length <= 1 ? 'white' : 'black'};
  `
  }
  font-weight: ${props=>props.length<=1 ? 'bold':'normal'};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`

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

````

- Al los botones se les pasa el nombre del tema a usar
- Y en el css se obtienen los valores del objeto pasado como props y ese valor funciona como llave para obtener los valores a mostrar

## 39 Extract the styled button

- Crear un archivo Button.js
- Copiar la constante que estaba en App.js a Button.js
- Recordar export default en archivo Button.js
- En archivo Button.js

````jsx
import styled, { css } from 'styled-components';

const Button = styled.button`
  border: none;
  ${props =>
    props.color && css`
  background-color: ${props => props.length > 2 ? props.theme[props.color] : props.length < 2 ? 'red' : 'pink'};
  color: ${props => props.length <= 1 ? 'white' : 'black'};
  `
  }
  font-weight: ${props=>props.length<=1 ? 'bold':'normal'};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`

export default Button;
````



- En archivo App.js

```jsx
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

```

