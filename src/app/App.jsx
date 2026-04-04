import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMapLocationDot, faBookmark } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/Bus-logo.svg";
import StopSearch from "../features/stopSearch/StopSearch";
import StopMap from "../features/stopMap/StopMap";
import MyStops from "../features/stopSearch/MyStops";
import { fetchStopDataSet, getSelectedStop, getStopDataSet } from "../features/stopSearch/stopSearchSlice";
import "./App.css";

function Layout() {
  const dispatch = useDispatch();
  const selectedStop = useSelector(getSelectedStop);
  const stops = useSelector(getStopDataSet);

  useEffect(() => {
    if (stops.length === 0) dispatch(fetchStopDataSet());
  }, [dispatch, stops]);

  return (
    <div className="App">
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />

        {!selectedStop && (
          <div className="tabs">
            <NavLink
              to="/"
              end
              className={({ isActive }) => "tab" + (isActive ? " activeTab" : "")}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Search
            </NavLink>
            <NavLink
              to="/map"
              className={({ isActive }) => "tab" + (isActive ? " activeTab" : "")}
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              Map
            </NavLink>
            <NavLink
              to="/mystops"
              className={({ isActive }) => "tab" + (isActive ? " activeTab" : "")}
            >
              <FontAwesomeIcon icon={faBookmark} />
              My Stops
            </NavLink>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StopSearch />} />
          <Route path="map" element={<StopMap />} />
          <Route path="mystops" element={<MyStops />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
