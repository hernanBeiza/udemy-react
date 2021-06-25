# Sección 2 - React Essentials

## 15 Qué es JSX

- Crear aplicación react

```bash
npx create-react-app myfirstapp
```

## 16 Import CSS

- Crear un archivo CSS normal: Custom.css

````css
.innerdiv {
	text-align: center;
	margin: auto;
	width: 60%;
	border:  3px solid black;
	background-color: #73AD21;
	padding: 70px 0;
}

.outerdiv {
	padding: 70px;
	background-color: red;
}
````



- className es usado en React, no class

````jsx
function App() {
  return (
    <div className="outerdiv">
      <div className="innerdiv">Verde</div>
    </div>
  );
}
````

## 17 Inline CSS

- Propiedades de CSS con guiones se escriben en camelCase
  - Background-color: backgroundColor
  - border-color: borderColor
- Valores usan coma simple
- Vienen de los archivos JSON: Convertirlo a JSON

````jsx
function App() {
  return (
    <div style={{padding:'70px 0', backgroundColor: 'blue'}}>
      <div className="innerdiv">Verde</div>
    </div>
  );
}
````

- 

## 18 Curly braces in react

- Se usa { } para evaluar expresiones Javascript durante la compilación
- Puede ser una variable, función u objeto o cualquier código que resuelva/retorne un valor

````jsx
const greenStyle = { color:'green' }
<Box style ={ greenStyle } />
````

- Lo cual es lo mismo que

````jsx
<box style ={{color:'green'}} />
````

## 19 Styles Objects

- Poner los estilos en un objeto
- Se puede convertir el CSS a JSON en: https://transform.tools/css-to-js

````jsx
const styles = {
  outerDiv: {
    padding:'70px 0', 
    backgroundColor: 'blue'
  },
  innerDiv: {
    textAlign: "center",
    margin: "auto",
    width: "60%",
    border: "3px solid black",
    backgroundColor: "#73AD21",
    padding: "70px 0"
    }
  }
}
// Aplicar en JSXfunction App() {
  return (
    <div style={styles.outerDiv}>
      <div style={styles.innerDiv}>Verde</div>
    </div>
  );
}
````

## 22

- N/A

## 21 Store jsx element to variable

```jsx
function App() {
  const styles = {
    outerDiv: {
      padding:'70px 0', 
      backgroundColor: 'blue'
    },
    innerDiv: {
      textAlign: "center",
      margin: "auto",
      width: "60%",
      border: "3px solid black",
      backgroundColor: "#73AD21",
      padding: "70px 0"
    }
  }

const someText = "Un texto";
const unDiv = <div style={{backgroundColor: 'white'}}>unDiv</div>
  return (
    <div style={styles.outerDiv}>
      <div style={styles.innerDiv}>{unDiv}</div>
    </div>
    );
}

export default App;

```

