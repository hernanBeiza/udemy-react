import React, {useEffect} from 'react';

let renderCount = 0;

function ComponentB(props) {

	useEffect(()=>{
		renderCount++;
	});

  return (
    <div className="ComponentB">
      <p>ComponentB: {renderCount} times || Counter {props.count}</p>
    </div>
  );
}

export default ComponentB;
