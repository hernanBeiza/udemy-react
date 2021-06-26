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
    <p>{props.children}</p>
    </div>
    </div>
    </div>
    );
}

export default Card;
