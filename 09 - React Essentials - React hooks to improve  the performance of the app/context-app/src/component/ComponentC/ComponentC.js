import { useState, useEffect } from 'react';

import { NameContext } from './../../App.js';
import { ColorContext } from './../../App.js';

function ComponentC() {

  return (
    <div>
      <p>Component C</p>
      <NameContext.Consumer>
        {/*
          {name=>{
            return <p>{name}</p>
          }}
        */}
        {name=>{
          return <ColorContext.Consumer>
            {color=>(
              <div> Name: { name } Color: { color }</div>
            )}
            </ColorContext.Consumer>
        }}
      </NameContext.Consumer>
    </div>
  );
}

export default ComponentC;
