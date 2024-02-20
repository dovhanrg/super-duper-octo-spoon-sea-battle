import React from 'react';
import './App.css';
import LocalPlayer from "./components/Player/LocalPlayer";
import RemotePlayer from "./components/Player/RemotePlayer";

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Sea Battle
        </p>
      </header>
      <div className="fieldsContainer">
          <LocalPlayer />
          <RemotePlayer />
      </div>
    </div>
  );
}

export default App;
