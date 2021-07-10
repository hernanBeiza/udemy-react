import{ useEffect, useState } from 'react';

import './Card.css';

function Card(props) {

  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  
  const recordMouse = e => {
    console.log("recordMouse",e);
    setX(e.clientX);
    setY(e.clientY);
  }

  useEffect(()=>{
    window.addEventListener("mousemove",recordMouse);
    return () => {
      console.log("Card: useEffect cleanUp")
      window.removeEventListener("mousemove",recordMouse);
    }
  },[]);

  return (
    <div className="Card">
    <div className="card">
    <img src={props.avatar} alt="Avatar" style={{width:'100%'}}/>
    <div className="container">
    <h4><b>{props.name}</b></h4>
    <p>{props.jobTitle}</p>
    <p>x pos: {x} y pos: {y}</p>
    <p><input type="text" onChange={props.onChangeName} value={props.name}/></p>
    <p><button onClick ={props.onDelete} className="button button-red">Delete</button></p>
    </div>
    </div>
    </div>
    );
}

export default Card;
