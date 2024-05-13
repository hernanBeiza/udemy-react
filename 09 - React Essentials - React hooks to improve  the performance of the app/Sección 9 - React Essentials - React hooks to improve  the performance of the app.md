# 09 - React Essentials - React hooks to improve  the performance of the app

## 48 useEffect fetch data with axios

- Instalar axios 

```
npm install axios
```

- Importar axios en app component

```jsx
import axios from 'axios';
```

- Implementar useEffect + axios para obtener la data al cargar el componente App

```jsx
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
```

### Recordar de useEffect

- Si se pasa un arreglo vacío, useEffect se ejecutará una vez
- Si un valor del arreglo de dependencias cambia("[nombre]"), useEffect se ejecutará cuando la dependencia cambie, o valor de "nombre" cambie
- useEffect se ejecutará en cada re render si no se pasa arreglo de dependencias

## 49 useEffect fetch a card

- Agregar al arreglo de dependencias de useEffect una propiedad: id
- Cambiar el id usando setId
- Agregar un campo de texto input
- Actualizar el HTML con la nueva estructura para mostrar sólo la tarjeta ingresada en el input

```jsx
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
```

## React Context

- Para agregar state a los componentes que están más abajo de la jerarquía se puede usar vía props
- Pero el problema es que se deben ir pasando de componente a componente: En pirámide
- Esto hace la mantenibilidad de código tediosa

```jsx
export const NameContext = React.createContext()
```

- En un componente se setea el valor

```jsx
import React from 'react';

import logo from './logo.svg';
import './App.css';

import ComponentA from './component/ComponentA/ComponentA';

export const NameContext = React.createContext();

function App() {
  return (
    <div className="App">
    <NameContext.Provider value={"Smith"}>
    <ComponentA/>
    </NameContext.Provider>
    </div>
  );
}

export default App;
```

- Y en el componente que consume el valor se usa NameContext.Consumer
  
  ```jsx
  import { useState, useEffect } from 'react';
  
  import { NameContext } from './../../App.js';
  
  function ComponentC() {
  
    return (
      <div>Component C
      <NameContext.Consumer>
        {name=>{
          return <p>{name}</p>
        }}
      </NameContext.Consumer>
      </div>
    );
  }
  
  export default ComponentC;
  ```

## 51 Múltiples React Context

- Se pueden crear varios ReactContext, uno dentro de otro o anidados
- En el componente padre, App.js

```jsx
import React from 'react';

import logo from './logo.svg';
import './App.css';

import ComponentA from './component/ComponentA/ComponentA';

export const NameContext = React.createContext();
export const ColorContext = React.createContext();

function App() {
  return (
    <div className="App">
    <NameContext.Provider value={"Smith"}>
      <ColorContext.Provider value={"red"}>
        <ComponentA/>
      </ColorContext.Provider>
    </NameContext.Provider>
    </div>
    );
}

export default App;
```

- En el componente hijo, ComponentC.js

```jsx
import { useState, useEffect } from 'react';

import { NameContext } from './../../App.js';
import { ColorContext } from './../../App.js';

function ComponentC() {

  return (
    <div>
      <span>Component C</span>
      <NameContext.Consumer>
        {/*
          {name=>{
            return <p>{name}</p>
          }}
        */}
        {name=>{        
          return <ColorContext.Consumer>
            {color=>(
              <div> Name: { name } Color: { color }</div>
            )}
            </ColorContext.Consumer>
        }}
      </NameContext.Consumer>
    </div>
  );
}

export default ComponentC;
```

- Esta forma es complicada de leer y se puede mejorar con la función useContext(Context);

## 52 useContext

- En componentes funcionales, se puede escribir de mejor forma, más fácil de leer

- Se importa useContext y se pasa por parámetro el context definido

- En el ComponentB, se usa la función useContext

```jsx
import { useState, useContext } from 'react';

import ComponentC from './../ComponentC/ComponentC';
import { NameContext, ColorContext } from './../../App';

function ComponentB() {

  const name = useContext(NameContext);
  const color = useContext(ColorContext);

  return (
    <div>
    <p>Component B</p>
    <p>Name: {name} </p>
    <p>Color: {color} </p>
    <ComponentC/>
    </div>
  );
}

export default ComponentB;
```

## 53 useReducer

- Se crea una función para la lógica del reducer
- useReducer define un valor de salida y la función alias para llamar al reducer

```jsx
import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup } from 'reactstrap';

const initialState = 0;
const reducer = (state,action)=>{
    console.log(state,action);
    switch(action){
        case "increment":
        return state+1;
        case "decrement":
        return state-1;
        case "reset":
        return initialState;
        default:
        return state;
    }
}

function Counter() {
    const [count,dispatch] = useReducer(reducer,initialState);

  return (
    <div className="Counter">
        <div>{count}</div>
        <ButtonGroup>
          <Button onClick={()=>dispatch("increment")}>Increment</Button>
          <Button onClick={()=>dispatch("decrement")}>Decrement</Button>
          <Button onClick={()=>dispatch("reset")} color={"danger"}>Reset</Button>
        </ButtonGroup>
    </div>
  );
}

export default Counter;
```

## 54 useReducer (normal)

- Para retornar múltiples valores, se puede pasar un objeto al reducer

```jsx
import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup } from 'reactstrap';

const initialState = {
    counter1:0,
    counter2:10
}
const reducer = (state,action)=>{
    console.log(state,action);
    switch(action.type){
        case "increment":
        return {...state, counter1:state.counter1 + 1};
        case "decrement":
        return {...state, counter1:state.counter1 - 1};
        case "reset":
        return initialState;
        default:
        return state;
    }
}

function Counter() {
    const [count,dispatch] = useReducer(reducer,initialState);

  return (
    <div className="Counter">
        <div>{count.counter1}</div>
        <ButtonGroup>
          <Button onClick={()=>dispatch({type:"increment"})}>Increment</Button>
          <Button onClick={()=>dispatch({type:"decrement"})}>Decrement</Button>
          <Button onClick={()=>dispatch({type:"reset"})} color={"danger"}>Reset</Button>
        </ButtonGroup>
    </div>
  );
}

export default Counter;
```

- Se manipula el objeto con una copia, usando {...}

- Se pueden pasar más parámetros para manipular el resultado la función del reducer

```jsx
import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Badge } from 'reactstrap';

const initialState = {
    counter1:0,
    counter2:10
}
const reducer = (state,action)=>{
    console.log(state,action);
    switch(action.type){
        case "increment":
        return {...state, counter1:state.counter1 + action.payload};
        case "decrement":
        return {...state, counter1:state.counter1 - action.payload};
        case "increment2":
        return {...state, counter2:state.counter2 + action.payload};
        case "decrement2":
        return {...state, counter2:state.counter2 - action.payload};
        case "reset":
        return initialState;
        default:
        return state;
    }
}

function Counter() {
    const [count,dispatch] = useReducer(reducer,initialState);

  return (
    <div className="Counter">
        <ButtonGroup>
          <Button color="primary">
          Counter1: <Badge color="secondary">{count.counter1}</Badge>
          </Button>
          <Button color="primary">
          Counter2: <Badge color="secondary">{count.counter2}</Badge>
          </Button>
      </ButtonGroup>
        <p></p>
        <ButtonGroup>
          <Button onClick={()=>dispatch({type:"increment", payload:1})}>Increment</Button>
          <Button onClick={()=>dispatch({type:"decrement", payload:1})}>Decrement</Button>
        </ButtonGroup>
        <p></p>
        <ButtonGroup>
          <Button onClick={()=>dispatch({type:"increment2", payload:5})}>Increment counter 2</Button>
          <Button onClick={()=>dispatch({type:"decrement2", payload:5})}>Decrement counter 2</Button>
        </ButtonGroup>
        <p></p>
        <ButtonGroup>
          <Button onClick={()=>dispatch({type:"reset"})} color={"danger"}>Reset</Button>
        </ButtonGroup>
    </div>
  );
}

export default Counter;
```

## 55 multiple useReducer

- Se puede simplificar la función reducer y usar de mejor forma duplicando la asignación del valor a otra constante

```jsx
import React, { useReducer } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Badge } from 'reactstrap';

const initialState = {
    counter:0
}
const reducer = (state,action)=>{
    console.log(state,action);
    switch(action.type){
        case "increment":
        return {...state, counter:state.counter + action.payload};
        case "decrement":
        return {...state, counter:state.counter - action.payload};
        case "reset":
        return initialState;
        default:
        return state;
    }
}

function Counter() {
  //Poner atención acá
    const [state1,dispatch1] = useReducer(reducer,initialState);
    const [state2,dispatch2] = useReducer(reducer,initialState);

  return (
    <div className="Counter">
        <ButtonGroup>
          <Button color="primary">
          Counter1: <Badge color="secondary">{state1.counter}</Badge>
          </Button>
          <Button color="primary">
          Counter2: <Badge color="secondary">{state2.counter}</Badge>
          </Button>
      </ButtonGroup>
        <p></p>
        <ButtonGroup>
          <Button onClick={()=>dispatch1({type:"increment", payload:1})}>Increment</Button>
          <Button onClick={()=>dispatch1({type:"decrement", payload:1})}>Decrement</Button>
          <Button onClick={()=>dispatch1({type:"reset"})} color={"danger"}>Reset</Button>
        </ButtonGroup>
        <p></p>
        <ButtonGroup>
          <Button onClick={()=>dispatch2({type:"increment", payload:1})}>Increment</Button>
          <Button onClick={()=>dispatch2({type:"decrement", payload:1})}>Decrement</Button>
          <Button onClick={()=>dispatch2({type:"reset"})} color={"danger"}>Reset</Button>
        </ButtonGroup>
        <p></p>
    </div>
  );
}

export default Counter;
```

## 56 useReducer with useContext

- Se puede pasar una variable de estado y una función al CounterContext Provider

- Así se peude usar en distintos componentes los valores que pasan por el dispatch del reducer

- En componente padre App

```jsx
import React, { useReducer } from 'react';

import logo from './logo.svg';
import './App.css';

import ComponentA from './components/ComponentA';

//Para poder ser usado en otros componentes
export const CounterContext = React.createContext();


const initialState = {
  counter:0
}
const reducer = (state,action)=>{
  console.log(state,action);
  switch(action.type){
    case "increment":
    return {...state, counter:state.counter + action.payload};
    case "decrement":
    return {...state, counter:state.counter - action.payload};
    case "reset":
    return initialState;
    default:
    return state;
  }
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <CounterContext.Provider value={{counter:state.counter, dispatch:dispatch}}>
      <div className="App">
      App JS {state.counter}
        <ComponentA/>
      }
      </div>
    </CounterContext.Provider>
  );
}

export default App;
```

- En componente hijo

```jsx
import React, { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Badge } from 'reactstrap';

import { CounterContext } from './../App';

function ComponentA() {
    const counterContext = useContext(CounterContext);
    console.log(counterContext);
    const {counter,dispatch} = counterContext;
  return (
    <div className="ComponentA">
        <ButtonGroup>
              <Button color="primary">
              ComponentA Counter: <Badge color="secondary">{counter}</Badge>
              </Button>
          </ButtonGroup>
            <p></p>
            <ButtonGroup>
              <Button onClick={()=>dispatch({type:"increment", payload:1})}>Increment</Button>
              <Button onClick={()=>dispatch({type:"decrement", payload:1})}>Decrement</Button>
              <Button onClick={()=>dispatch({type:"reset"})} color={"danger"}>Reset</Button>
            </ButtonGroup>
    </div>
  );
}

export default ComponentA;
```

## 57 use of useReducer with useContext

- Se puede reusar la lógica en toda el árbol de componentes hacia abajo
- Revisar reducer-multiple-app

## 58 use useReducer with useEffect to fetch the data

- axios

```
npm install axios
```

- En el componente principal

```jsx
import logo from './logo.svg';
import './App.css';

import React, {useEffect, useReducer} from 'react';
import axios from 'axios';

const initialState = {
  loading:true,
  error:"",
  todos:[]
}

const reducer = (state,action) =>{
  switch (action.type) {
    case 'SET_DATA':
      return {
        loading:false,
        error:"",
        todos:action.payload
      }
    break;
    case 'SET_ERROR':
      return {
        loading:false,
        error:"Error encontrado",
        todos:[]
      }
    break;
    default:
    return state;
  }
}

function App() {
  const[state,dispatch]= useReducer(reducer,initialState);
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(res=>{
      console.log(res.data);
      dispatch({type:"SET_DATA",payload:res.data})
    })
    .catch(err=>{
      dispatch({type:"SET_ERROR"})
    })
  },[]);

  let listMarkup = (
    <ul>
    {state.todos.map(itemTodo=><li key={itemTodo.id}>{itemTodo.title}</li>)}
    </ul>
    )

  return (
    <div className="App">
    {state.loading ? 'Loading' : (state.error ? state.error : listMarkup)}
    </div>
  );
}

export default App;
```

- Render condicional

## 59 Beautify the list with ReactStrap / Bootstrap

- Render condicional

- Uso de reactstrap

## 60 useMemo

- En react los componentes se rerenderizan incluso si los cambios en el state no tienen que ver con ellos mismos
  
  - Cambios en state de otros componentes

- Para evitar eso se puede usar useMemo
  
  - Así se puede evitar impactar en la performance de la aplicación

- useMemo sirve para evitar gatillar el renderizado de un componente

- Recibe un arreglo de variables para condicionar el gatillado de la función, como useEffect

- En el componente padre se importa useMemo y se retorna el componente a condicionar

```jsx
const memoComponentA = useMemo(()=>{
    return ComponentA;
},[])
//[] para gatilla una sola vez
```

- Y en la vista del componente padre

```
<p></p>
{memoComponentA}
```

- Componente padre

```jsx
import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect,useMemo} from 'react';

import ComponentA from './components/ComponentA';

function App() {
  const [contador, setContador] = useState(0);
  const incrementar = () => {
    setContador(contador+1);
  };
  const memoComponentA = useMemo(() => {
    return <ComponentA/>;
  },[]);
  return (
    <div className="App">
      <p>
        <code>App.js contador: {contador}</code>
      </p>
      <p>
        <button onClick={incrementar}>Incrementar</button>
      </p>
      <p>
        {memoComponentA}
      </p>
    </div>
  );
}

export default App;
```

- Componente hijo

```jsx
import React, {useEffect} from 'react';

let renderCount = 0;

function ComponentA() {

    useEffect(()=>{
        renderCount++;
    });

  return (
    <div className="ComponentA">
      <p>ComponentA</p>
      <p>
        <code>
            {renderCount}
        </code>
      </p>
    </div>
  );
}

export default ComponentA;
```

## 61 useMemo

- Si se quiere pasar un valor al componente hijo
- Se pueden usar props en la función memoComponentA
- Pero hay que pasar la dependencia en la función useMemo para que permita el renderizado
- Componente padre

```jsx
  const memoComponentA = useMemo(() => {
    return <ComponentA count={contador}/>;
  },[contador]);
//Dependencia contador
```

- Componente hijo

```jsx
import React, {useEffect} from 'react';

let renderCount = 0;

function ComponentA(props) {

    useEffect(()=>{
        renderCount++;
    });

  return (
    <div className="ComponentA">
      <p>ComponentA</p>
      <p>
        <code>
            {renderCount} times || Counter {props.count}
        </code>
      </p>
    </div>
  );
}

export default ComponentA;
```

- Solo los componentes que usan useMemo se verán condicionados en su renderizado
- Se crea otro componente hijo pero no se condiciona. Componente padre:

```jsx
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
```





## 62 useRef

- Permite acceder o agregar elementos al dom

```javascript
import {useRef} from 'react';

import './App.css';

function App() {
  const inputRef = useRef();

  return (
    <div className="App">
    <input ref ={inputRef} type="text"/>
    <input type="text"/>
    <button type="button" onClick={()=>{
      inputRef.current.focus()}
    }>Cambiar foco al primero</button>
    </div>
  );
}

export default App;
```



## 63 useRef

- Cuando los componentes son desmontados hay veces que no se desmontan las funciones vinculadas a él y se siguen ejecutando
- useRef puede servir para eso

## 64 useCallback

- Usado para evitar que una función se vuelva a renderear
- Prevenir la recreación de una función
- Acá se etán duplicando los valores

`````javascript
import React, {useCallback, useState} from 'react';
import './App.css';

const functionCounter = new Set();

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment = () => {
    setCount(count+1);
  }

  const increment2 = () => {
    setCount2(count2+1);
  }
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

`````

- Acá se evita el duplicado, usando useCallback

````javascript
import React, {useCallback, useState} from 'react';
import './App.css';

const functionCounter = new Set();

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment = useCallback(() => {
    setCount(count+1);
  },functionCounter);

  const increment2 = useCallback(() => {
    setCount2(count2+1);
  },functionCounter);
  
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
````

- De esta forma se evita recrear los llamados a la función: Evitar duplicados

## 65 custom hook

- Se puede crear un archivo para almacenar la lógica compartida de los componentes
- El custom hook

````jsx
import { useState } from 'react';

const useCounter = (initialCount = 0, value = 0) =>{
	const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((prevCount)=>prevCount+value);
  }

  const decrement = () => {
    setCount((prevCount)=>prevCount-value);
  };

  const reset = () => {
    setCount(0)
  };
  return [count, increment, decrement, reset];
}

export default useCounter;
````



- En el componente a usar 

````jsx
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

````

## 66 Custom hook in form

- La idea de los custom hooks es separar la lógica del componente
- Reutilizar lógica en múltiples implementaciones

##### Ejemplo 

- En el custom hook

````jsx
import React , { useState } from 'react';

const useInput = (initialValue) => {
	const [value, setValue] = useState("");

	const clearText = () => {
		setValue(initialValue);
	}

	const bindForm = {
		value,
		onChange: e => {
			console.log(e)
			setValue(e.target.value)
		}
	}


	return [value, bindForm, clearText];
}

export default useInput;
````

- Se puede usar el operador spread, se pueden pasar las mismas propiedades declaradas en el custom hook al input del html, del componente: se rendererizará como html
- En el component

```jsx
import React from 'react';

import useInput from './../hooks/useInput';

const FormBase = () => {
  const [nombre,bindNombre,clearNombre] = useInput("");
  const [email,bindEmail,clearEmail] = useInput("");

  const enviar = (e) => {
    e.preventDefault();
    alert(`El nombre es ${nombre} y el correo ${email}`);
    clearNombre();
    clearEmail();
  }

  return (
    <form onSubmit={enviar}>
    <div>
    <label>Nombre</label>
    <input {...bindNombre} type="text"/>
    </div>
    {/**}
    <div>
    <label>Email</label>
    <input value={email} onChange={e =>setEmail(e.target.value)} type="text"/>
    </div>
    */}
    <div>
    <label>Email</label>
    <input {...bindEmail} type="text"/>
    </div>
    <button>Enviar</button>
    </form>
  );

}

function Form() {
  return (
    <div className="Form">
    <FormBase/>
    </div>
  );
}

export default Form;

```

