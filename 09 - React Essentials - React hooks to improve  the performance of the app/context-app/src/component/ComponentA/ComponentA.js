import { useState, useEffect } from 'react';

import ComponentB from './../ComponentB/ComponentB'

function ComponentA() {

  return (
    <div>Component A
    <ComponentB/>
    </div>
  );
}

export default ComponentA;
