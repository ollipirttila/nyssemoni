import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStopDataSet,
  setSelectedStop,
  getStopDataSet,
  getStatus,
  getSelectedStop,
} from "./stopSearchSlice";

import StopItem from "../../common/StopItem";
import SelectedStopItem from "../../common/SelectedStopItem";

import styles from "./stopSearch.module.css";

export function StopSearch() {
  const stopData = useSelector(getStopDataSet);
  const status = useSelector(getStatus);
  const selectedStop = useSelector(getSelectedStop);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch stopdata once when the app first renders
    stopData.length === 0 && dispatch(fetchStopDataSet());
  }, [dispatch, stopData]);

  const selectStop = (stop) => {
    console.log("Selected stop: " + stop);
    dispatch(setSelectedStop(stop));
  };

  const renderedStops = stopData.map((stop) => {
    return (
      <StopItem
        key={stop.shortName}
        stopData={stop}
        onSelectStop={selectStop}
      ></StopItem>
    );
  });

  return (
    <div className={styles.stopSearch}>
      <h1>Data</h1>
      <div>STATUS: {status}</div>
      <div className={styles.stopList}>
        DATA:
        {!selectedStop ? (
          renderedStops
        ) : (
          <SelectedStopItem
            stopData={selectedStop}
            onDeselect={selectStop}
          ></SelectedStopItem>
        )}
      </div>
    </div>
  );
}
