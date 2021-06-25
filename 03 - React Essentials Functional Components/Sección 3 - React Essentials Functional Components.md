# Sección 3

## 22 23 Crear lista de componentes

- Crear un archivo nuevo Card.js

````jsx
function Card() {
  return (
    <div className="Card">
    <div className="card">
    <img src="img/img_avatar.png" alt="Avatar" style={{width:'100%'}}/>
    <div className="container">
    <h4><b>Hernán</b></h4>
    <p>Architect & Engineer</p>
    </div>
    </div>
    </div>
    );
}

export default Card;
````

- En el archivo App.js, usar el nuevo component

````jsx
import './App.css';

import Card from './Card/Card';

function App() {
  return (
    <div className="App">
    <Card name="Alan Smith"/>
    <Card name="Hernán Beiza"/>
    <Card name="Jhon Doe"/>
    </div>
    );
}

export default App;
````