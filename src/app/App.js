import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import logo from "../Bus-logo.svg";
import StopSearch from "../features/stopSearch/StopSearch";
import MyStops from "../features/stopSearch/MyStops";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />

        <BrowserRouter>
          <div className="App-navigation">
            <Link to="/">Home</Link> <Link to="/mystops">My Stops</Link>
          </div>

          <Routes>
            <Route path="/" element={<StopSearch />} />
            <Route path="/mystops" element={<MyStops />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
