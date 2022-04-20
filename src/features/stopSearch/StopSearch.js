import React, { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStopDataSet,
  fetchStopMonitoringData,
  setSelectedStop,
  getStopDataSet,
  getStopMonitoringData,
  getStatus,
  getSelectedStop,
} from "./stopSearchSlice";

import StopItem from "../../common/StopItem";
import BusItem from "../../common/BusItem";
import SelectedStopItem from "../../common/SelectedStopItem";

import styles from "./StopSearch.module.css";

export default function StopSearch() {
  const stopData = useSelector(getStopDataSet);
  const stopMonitoringData = useSelector(getStopMonitoringData);
  //TODO: näytä loading, jos status on loading.
  const status = useSelector(getStatus);

  const selectedStop = useSelector(getSelectedStop);
  const dispatch = useDispatch();

  const [searchPhrase, setSearchPhrase] = useState("");

  // Store URLSearchParams object in local state
  let [urlQueryString, setUrlQueryString] = useSearchParams();
  // Store value of stop URL query string
  let stopFromUrl = urlQueryString.get("stop");

  // Fetch stopdata once when the app first renders
  useEffect(() => {
    stopData.length === 0 && dispatch(fetchStopDataSet());
  }, [dispatch, stopData]);
  // Set selected stop, if there is a URL Query string present.
  useEffect(() => {
    // TODO: Tätä kutsutaan ennen kuin stopData on ehditty ladata, jolloinka ei toimi.
    stopFromUrl &&
      dispatch(setSelectedStop(getStopItemDataByShortname(stopFromUrl)));
  }, [dispatch, stopFromUrl]);

  const selectStop = (stop) => {
    dispatch(setSelectedStop(stop));
    dispatch(fetchStopMonitoringData(stop.shortName));
    setUrlQueryString({ stop: stop.shortName });
    setSearchPhrase("");
  };

  const deSelectStop = () => {
    dispatch(setSelectedStop(null));
    setUrlQueryString({ stop: 0 });
  };

  const getStopItemDataByShortname = (stopShortName) => {
    console.log(stopShortName + JSON.stringify(stopData));
    return stopData.find((item) => item.shortName === stopShortName);
  };

  const SearchResults = stopData.filter(
    (item) =>
      item.name.toLowerCase().search(searchPhrase.toLowerCase()) !== -1 ||
      item.shortName.search(searchPhrase) !== -1
  );

  const renderedStops = SearchResults.map((stop) => {
    return (
      <StopItem
        key={stop.shortName}
        stopData={stop}
        onSelectStop={selectStop}
      ></StopItem>
    );
  });

  const renderedBusses = stopMonitoringData.map((bus) => {
    return <BusItem key={bus.vehicleRef} busData={bus}></BusItem>;
  });

  return (
    <div className={styles.stopSearch}>
      <input
        type="text"
        className={styles.searchInput}
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />

      <div className={styles.stopList}>
        {!selectedStop ? (
          searchPhrase.length !== 0 ? (
            renderedStops
          ) : null
        ) : (
          <Fragment>
            <SelectedStopItem
              stopData={selectedStop}
              onDeselect={deSelectStop}
            ></SelectedStopItem>
            {renderedBusses}
          </Fragment>
        )}
      </div>
    </div>
  );
}
