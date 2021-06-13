# Sección 1

## 3 var vs let vs const

var es global

- var es global

````javascript
// var vs let vs const
var edad = 45;
if(...) {
	var edad = 90
	console.log(edad) //90
}
console.log(edad) //90
````



- let, el valor de la variable dependerá del contexto

````javascript
// var vs let vs const


let edad = 45;
if(...) {
	let edad = 90
	console.log(edad) //90
}
console.log(edad) //45
````





### const

- Constante
- No permite modificar el objeto en sí
- Pero sí las propiedades del objeto

````javascript
// var vs let vs const

const usuario = { }
usuario = //...
//Error
usuario.nombre = "H"
//No error
````



## 4 El problema de usar let en un switch

- Problema de usar let en switch/case

````javascript
// El problema de usar let en un switch

function frutaColor(fruta){
	switch(fruta){
		case "manzana":
      var color = "rojo"
      return color;
    case "platano":
      var color ="amarillo"
      return color;
    default:
	    return "otro color";
	}
}

console.log(frutaColor("manzana"));//rojo
console.log(frutaColor("platano"));//amarillo

//Si se usa let
function frutaColor(fruta){
	switch(fruta){
		case "manzana":
      let color = "rojo"
      return color;
    case "platano":
      let color ="amarillo"
      return color;
    default:
	    return "otro color";
	}
}

console.log(frutaColor("manzana"));//rojo
console.log(frutaColor("platano"));//amarillo
//error: identifier color ya ha sido declarado
//let bloquea el scope, para solucionarlo

````

- let bloquea el scope, para solucionarlo
- Para solucionarlo

````javascript
// El problema de usar let en un switch

//Si se usa let, usar { }
function frutaColor(fruta){
	switch(fruta){
		case "manzana": {
      let color = "rojo"
      return color;      
    }
    case "platano": {
      let color ="amarillo"
      return color;      
    }
    default:
	    return "otro color";
	}
}

console.log(frutaColor("manzana"));//rojo
console.log(frutaColor("platano"));//amarillo
````

## 5 Template Literal

- Escribir por consola valores concatenados se puede simplicar usando template literals

````javascript
// Template Literal

console.log("Prueba")
const nombre ="Hernán";
console.log ("Soy " + nombre + " y estoy desarrollando");
//Uso de literal, con comilla ``
console.log (`Soy ${nombre} y estoy desarrollando`);
````

- Comilla al revés

## 6 Arrow function

- En vez de escribir una función así

```javascript
// Arrow function
// Caso 1
function saludar(nombre) {
  return `Mi nombre es ${nombre}`;
}

console.log(saludar("Hernán"));

// Caso 2
// Con ES6
const saludar2 = (nombre) => {
  return `Mi nombre es ${nombre}`;
}
console.log(saludar2("Hernán"));

// Caso 3
//Si tiene un sólo parámetro, se puede simplicar y escribir así.
// En caso de más lógica o parámetros, se debe usar como el caso 2
const saludar3 = (nombre) => `Mi nombre es ${nombre}`;

console.log(saludar3("HB3"))
```



## 7 Classes

````javascript
class Animal {
  comer = () => console.log("Estoy comiendo");
}

class Perro extends Animal {
  peso = 20;
  edad = 0;
  ladrar = () => console.log("guau")
}

var perrito = new Perro();
perrito.ladrar();
perrito.comer();
````



## 8 Spread operator

- Unir arreglos
- 

````
// UNir arreglos
var listaVieja = [1,2,3];
var listaNueva = [...listaVieja,4,5];
console.log(listaNueva)
````

- Unir, actualizar propiedades de un objeto desde otro

```javascript
var objetoViejo = {
  nombre:"HB",
  edad: 1
}

var objetoNuevo = {
  ...objetoViejo,  edad:2
}

console.log(objetoNuevo)
```

- Se puede usar para listar o recorrer los valores

````javascript
const mostrarValores = (...args) => {
  console.log(args)
  for(var i=0;i<args.length; i++) {
    console.log(args[i]);
  }
}

mostrarValores("Prueba", "Otro")
//Muestra los valores de dos maneras diferentes por consola
/*
(2) [
"Prueba",
"Otro"
]
Prueba
Otro
*/
````



## 9 Destructuring

- Se puede aplicar en  objetos y arreglos
- Acceder a ciertas propiedades de un objeto

````javascript
var persona = {
  nombre: "Hernán",
  apellido: "Beiza",
  edad: 33,
  colorDeOjos:"Café"
}

const {nombre, edad } = persona;
console.log(nombre);
console.log(edad);
````

- En arreglos

```javascript
var [a, b] = [1,2];
console.log(a);
console.log(b);
var [a,b,...remain]= [1,2,3,4,5,6,7,8,9]
console.log(...remain);
var [a,b,c] = [1,2,3];
console.log(c)
```



## 10 Primitive vs Reference

- Una variable puede almacenar dos tipos de valores: Primitivos o valores por referencia

##### Primitivos

- Data que se almacena en el stack

- Almacenadao directamente en el heap

##### Valores por referencia

- Objetos que son almacenados en el heap

- El valor almacenado es un puntero hacia la ubicación de memoria en dónde el objeto es almacenado

- Valores primitivos incluyen Undefined, Null, Boolean, Number, Strings

## 11 Primitive vs Reference

- Valores primitivos: Almacenados por valor

````javascript
var nombre = "Hernán"
var nombreCopia = nombre;
console.log("nombre ",nombre);
console.log("nombreCopia ",nombreCopia);
nombre = "Steve";
console.log("nombre ",nombre);
console.log("nombreCopia ",nombreCopia);
//En consola
/*
nombre Hernán
nombreCopia Hernán
nombre Steve
nombreCopia Hernán
*/
````

- Valores por referencia: Almacenados por referencia 
- Modificará la referencia original, porque el puntero "apunta" hacia la misma ubicación de memoria que el objeto original

```javascript
const usuario = { nombre:"Hernán" }
const usuarioCopia = usuario;

console.log("usuario ", usuario);
console.log("usuarioCopia ", usuarioCopia);
usuario.nombre = "Steve";
//Modifica el original
console.log("----")
console.log("usuario ", usuario);
console.log("usuarioCopia ", usuarioCopia);
//Consola
/*
usuario 
{
nombre:"Hernán"
}
usuarioCopia 
{
nombre:"Hernán"
}
----
usuario 
{
nombre:"Steve"
}
usuarioCopia 
{
nombre:"Steve"
}
*/
```

- Para solucionar eso se puede "clonar" la referencia usando "..."

```javascript
const usuario = {	nombre:"Hernán" }
const usuarioCopia = {...usuario};
// ... Creará una nueva copia, clonará, hacia una nueva ubicación de memoria
console.log("usuario ", usuario);
console.log("usuarioCopia ", usuarioCopia);
console.log("----")
usuario.nombre = "Steve";
console.log("usuario ", usuario);
console.log("usuarioCopia ", usuarioCopia);
//Consola
/*
usuario 
{
nombre:"Hernán"
}
usuarioCopia 
{
nombre:"Hernán"
}
----
usuario 
{
nombre:"Steve"
}
usuarioCopia 
{
nombre:"Hernán"
}
*/
```



## 12 Import and export

- index.html

````html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
  <script type="module" src="script.js"></script>
	<title></title>
</head>
<body>
</body>
</html>
````

- script.js

````javascript
import app from './componente1.js'
import { platano, naranja } from './componente2.js'
import * as frutas from './componente2.js'
console.log(app);
console.log(platano);
console.log(naranja);
console.log(frutas.banana);
console.log(frutas.orange);
````

- componente1.js

```javascript
const manzana = "manzana"
export default manzana
```

- componente2.js

````javascript
export const banana = "platano"
export const orange = "naranja"
````



## 13 Array function

- Map: Transformar cada elemento. Retorna un areglo de cada elemento transformado a uno nuevo

```
var numeros = [1,2,3,4];
console.log(numeros);
const plus3 = numeros.map(num=>num=3);
console.log(plus3);
```



## 14 For in / for of

- 