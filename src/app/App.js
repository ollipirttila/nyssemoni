import React from "react";
import logo from "../Bus-logo.svg";
import { StopSearch } from "../features/stopSearch/StopSearch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StopSearch />
      </header>
    </div>
  );
}

export default App;
