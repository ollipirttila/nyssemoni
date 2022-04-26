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
import Button from "../../common/Button";
import SaveDialog from "../../common/SaveDialog";
import BusItem from "../../common/BusItem";
import SelectedStopItem from "../../common/SelectedStopItem";

import styles from "./StopSearch.module.css";

export default function StopSearch() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [stopSavedToBrowser, setStopSavedToBrowser] = useState(false);
  const [saveDialogActive, setSaveDialogActive] = useState(false);

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

  // Fetch stopdata once when the app first renders
  useEffect(() => {
    stopData.length === 0 && dispatch(fetchStopDataSet());
  }, [dispatch, stopData]);

  // If there is a URL Query string present, select the stop and initialize the app.
  useEffect(() => {
    stopFromUrl && dispatch(initializeAppState(stopFromUrl));
  }, [dispatch, stopFromUrl]);

  // When monitoring a stop, check if it is already saved to local browser memory
  useEffect(() => {
    if (localStorage.getItem(stopFromUrl) !== null) {
      setStopSavedToBrowser(true);
    }
    return () => setStopSavedToBrowser(false);
  }, [stopFromUrl, stopSavedToBrowser]);

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

  const toggleSaveDialog = () => {
    setSaveDialogActive(!saveDialogActive);
  };

  const HandleSaveSubmit = (customName) => {
    localStorage.setItem(
      selectedStop.shortName,
      JSON.stringify({
        userStopName: customName,
        stopName: selectedStop.name,
      })
    );
    console.log(localStorage);
    setStopSavedToBrowser(true);
    toggleSaveDialog();
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
      {/* Search input field */}
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
      {/* Listing search results */}
      <div className={styles.stopList}>
        {!selectedStop ? (
          searchPhrase.length !== 0 ? (
            renderedStops
          ) : null
        ) : (
          // Showing stops of selected bus stop
          <Fragment>
            <SelectedStopItem
              stopData={selectedStop}
              onDeselect={deSelectStop}
            ></SelectedStopItem>

            {/* Saving stop to my stops */}
            {!stopSavedToBrowser && !saveDialogActive && (
              <Button onClickHandler={() => toggleSaveDialog}>
                Save stop to browser
              </Button>
            )}
            {saveDialogActive && (
              <SaveDialog
                onSaveCancel={toggleSaveDialog}
                onSaveSubmit={HandleSaveSubmit}
              >
                Save to my stops
              </SaveDialog>
            )}

            {renderedBusses}
          </Fragment>
        )}
      </div>
    </div>
  );
}
