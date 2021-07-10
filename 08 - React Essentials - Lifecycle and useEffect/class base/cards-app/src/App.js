import { Component } from 'react';

import './App.css';

import { ThemeProvider } from 'styled-components';

import Card from './Card/Card';
import Button from './element/Button';

const theme = {
  primary: '#4CAF50',
  mango:'yellow'
}

class App extends Component {

  constructor(props){
    console.log("App: constructor");
    super(props);
    this.state = {
      cards:[
      { id:100, name:"Victor", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
      { id:200,  name:"Marcus", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" },
      { id:300,  name:"Jaco", title:"National Infrastructure Supervisor", avatar:"https://cdn.fakercloud.com/avatars/haydn_woods_128.jpg" }
      ],
      showCard:true
    }
  }

  toggleShowCardHandler () { this.setState({showCard:!this.state.showCard})};

  deleteCardHandler (cardIndice) {
    //Es necesario ... para poder re renderar la vista
    const cardsCopy = [...this.state.cards];
    cardsCopy.splice(cardIndice,1);
    this.setState({cards:cardsCopy});
  }

  changeNameHandler (event,cardIndice) {
    //1 Obtener la tarjeta a modificar
    const indexEncontrado = this.state.cards.findIndex(itemCard=>itemCard.id===cardIndice);
    //2 Crear una copia de las tarjetas
    const cardsCopy = [...this.state.cards];
    //3 Cambiar el nombre de la tarjeta
    cardsCopy[indexEncontrado].name = event.target.value;
    //4 Actualizar tarjetas
    this.setState({cards:cardsCopy});
  }

  static getDerivedStateFromProps (props,state) {
    console.log("App: getDerivedStateFromProps");
    console.log(props, state);
    return state;
  }

  componentDidMount() {
    console.log("App: componentDidMount");
  }

  render() {
    console.log("App: render");
    const classes = ["button"];

    if (this.state.cards.length<3) classes.push("pink");
    if (this.state.cards.length<2) classes.push("red");  

    const cardMarkup = (
      this.state.showCard && (
        this.state.cards.map ((card,index)=><Card 
          name={card.name} 
          jobTitle={card.title} 
          avatar={card.avatar}
          key ={card.id}
          onDelete={() => this.deleteCardHandler(index)}
          onChangeName={(event) => this.changeNameHandler(event,card.id)}
          />
          )
        )
      )
    return (
      <ThemeProvider theme={theme}>
      <div className="App">
      <Button color="primary" length={this.state.cards.length}>Toggle</Button>
      <button className={classes.join(" ")} onClick={()=>this.toggleShowCardHandler()}>Toggle Show/Hide</button>
      {cardMarkup}
      </div>
      </ThemeProvider>
    ); 
  }
}

export default App;
