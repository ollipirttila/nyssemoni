import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSelectedStop } from "../features/stopSearch/stopSearchSlice";

import logo from "../assets/Bus-logo.svg";
import StopSearch from "../features/stopSearch/StopSearch";
import MyStops from "../features/stopSearch/MyStops";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />

        <BrowserRouter>
          <div className="App-navigation">
            <Link onClick={() => dispatch(setSelectedStop(null))} to="/">
              Search
            </Link>
            <Link to="/mystops">My Stops</Link>
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
