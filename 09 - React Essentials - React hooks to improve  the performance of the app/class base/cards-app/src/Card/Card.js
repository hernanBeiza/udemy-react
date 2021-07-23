import { Component } from 'react';

import './Card.css';

class Card extends Component {

  constructor(props){
    super(props);
    console.log("Card: constructor");
    console.log(this.state);
    this.state = {
      id: "1"
    }
    console.log(this.state);
  }

  static getDerivedStateFromProps (props,state) {
    console.log("Card: getDerivedStateFromProps");
    console.log(props, state);
    return state;
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log("Card: shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Card: getSnapshotBeforeUpdate");
    return { snapshot: "some snapshot" }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Card: componentDidUpdate");
  }

  componentDidMount() {
    console.log("Card: componentDidMount");
  }

  componentWillUnmount() {
    console.log("Card: componentWillUnmount");
  }

  render(){
    console.log("Card: render");
    //console.log(this.props);
    return (
      <div className="Card">
      <div className="card">
      <img src={this.props.avatar} alt="Avatar" style={{width:'100%'}}/>
      <div className="container">
      <h4><b>{this.props.name}</b></h4>
      <p>{this.props.jobTitle}</p>
      <p><input type="text" onChange={this.props.onChangeName} value={this.props.name}/></p>
      <p><button onClick ={this.props.onDelete} className="button button-red">Delete</button></p>
      </div>
      </div>
      </div>
      );    
  }
}

export default Card;
