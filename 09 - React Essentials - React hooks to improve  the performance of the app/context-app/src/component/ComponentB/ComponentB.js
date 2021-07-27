import { useState, useContext } from 'react';

import ComponentC from './../ComponentC/ComponentC';
import { NameContext, ColorContext } from './../../App';

function ComponentB() {

  const name = useContext(NameContext);
  const color = useContext(ColorContext);

  return (
    <div>
    <p>Component B</p>
    <p>Name: {name} </p>
    <p>Color: {color} </p>
    <ComponentC/>
    </div>
  );
}

export default ComponentB;
