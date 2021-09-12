import React, {useEffect} from 'react';

let renderCount = 0;

function ComponentA(props) {

	useEffect(()=>{
		renderCount++;
	});

  return (
    <div className="ComponentA">
      <p>ComponentA: {renderCount} times || Counter {props.count}</p>
    </div>
  );
}

export default ComponentA;
