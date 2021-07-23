import './Card.css';

function Card(props) {


  return (
    <div className="Card">
    <div className="card">
    <div className="container">
    <h4><b>{props.name}</b></h4>
    <p>{props.phone}</p>
    <p><input type="text" onChange={props.onChangeName} value={props.name}/></p>
    <p><button onClick ={props.onDelete} className="button button-red">Delete</button></p>
    </div>
    </div>
    </div>
    );
}

export default Card;
