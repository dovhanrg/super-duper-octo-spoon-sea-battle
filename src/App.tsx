import React from 'react';
import './App.css';
import Field from "./components/Field";

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Sea Battle
        </p>
      </header>
      <div className="fieldsContainer">
          <Field />
          {/*<Field />*/}
      </div>
    </div>
  );
}

export default App;
