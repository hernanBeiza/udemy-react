import React from 'react';

import logo from './logo.svg';
import './App.css';

import ComponentA from './component/ComponentA/ComponentA';

export const NameContext = React.createContext();
export const ColorContext = React.createContext();


function App() {
  return (
    <div className="App">
    <NameContext.Provider value={"Smith"}>
      <ColorContext.Provider value={"red"}>
        <ComponentA/>
      </ColorContext.Provider>
    </NameContext.Provider>
    </div>
    );
}

export default App;
