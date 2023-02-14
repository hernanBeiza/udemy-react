import React, {useState, useEffect, useRef} from 'react';

function Component() {
  const [count, setCount] = useState(0);
  const componentRef = useRef(true)

  useEffect(()=>{
    return () => {
      componentRef.current = false;
    }
  },[]);

  const fakeFetch = () => {
    setTimeout(()=>{
      if(componentRef.current){
        setCount(count+1);
      }
      console.log(count);
    },2000);
  }
  return (
    <div className="Component">
    <h1>Component count: {count}</h1>
    <button onClick={fakeFetch}>fake fetch</button>
    </div>
  );
}

export default Component;
