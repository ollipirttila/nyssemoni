import React, { useState, useEffect, Fragment } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStopDataSet,
  fetchStopMonitoringData,
  setSelectedStop,
  getStopDataSet,
  getStopMonitoringData,
  getStatus,
  getSelectedStop,
  initializeAppState,
} from "./stopSearchSlice";

import StopItem from "../../common/StopItem";
import BusItem from "../../common/BusItem";
import SelectedStopItem from "../../common/SelectedStopItem";

import styles from "./StopSearch.module.css";

export default function StopSearch() {
  const [searchPhrase, setSearchPhrase] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get URL query strings for use in case of direct URL accesss
  let [urlQueryString, setUrlQueryString] = useSearchParams();
  let stopFromUrl = urlQueryString.get("stop");

  const stopData = useSelector(getStopDataSet);
  const stopMonitoringData = useSelector(getStopMonitoringData);
  const selectedStop = useSelector(getSelectedStop);
  //TODO: näytä loadingspinner, jos status on loading.
  const status = useSelector(getStatus);

  // Fetch stopdata once when the app first renders and set selected stop,
  // if there is a URL Query string present.
  useEffect(() => {
    stopData.length === 0 && dispatch(fetchStopDataSet());
  }, [dispatch, stopData]);

  useEffect(() => {
    stopFromUrl && dispatch(initializeAppState(stopFromUrl));
  }, [dispatch, stopFromUrl]);

  const selectStop = (stop) => {
    dispatch(setSelectedStop(stop));
    dispatch(fetchStopMonitoringData(stop.shortName));
    setUrlQueryString({ stop: stop.shortName });
    setSearchPhrase("");
  };

  const deSelectStop = () => {
    dispatch(setSelectedStop(null));
    stopFromUrl = null;
    navigate("/");
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
      {!selectedStop && (
        <div className={styles.searchSection}>
          <div className={styles.searchDescription}>
            Find your stop by name or number
          </div>
          <input
            type="text"
            placeholder="E.g. Keskustori or 0001"
            className={styles.searchInput}
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </div>
      )}

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
