import './Custom.css';

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
