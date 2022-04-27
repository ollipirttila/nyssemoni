import React, { useState, useEffect, Fragment } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStopDataSet,
  fetchStopMonitoringData,
  setSelectedStop,
  getStopDataSet,
  getStopMonitoringData,
  getSelectedStop,
  initializeAppState,
} from "./stopSearchSlice";

import StopItem from "../../common/StopItem";
import Button from "../../common/Button";
import MyStopDialog from "../../common/MyStopDialog";
import BusItem from "../../common/BusItem";
import SelectedStopItem from "../../common/SelectedStopItem";

import styles from "./StopSearch.module.css";

export default function StopSearch() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [stopSavedToBrowser, setStopSavedToBrowser] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };
  const openDialog = () => {
    setDialogOpen(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get URL query strings for use in case of direct URL accesss
  let [urlQueryString, setUrlQueryString] = useSearchParams();
  let stopFromUrl = urlQueryString.get("stop");

  const stopData = useSelector(getStopDataSet);
  const stopMonitoringData = useSelector(getStopMonitoringData);
  const selectedStop = useSelector(getSelectedStop);

  //TODO: Show a loading spinner while data is loading.
  // const status = useSelector(getStatus);

  // Fetch stopdata once when the app first renders
  useEffect(() => {
    stopData.length === 0 && dispatch(fetchStopDataSet());
  }, [dispatch, stopData]);

  // If there is a URL Query string present, select the stop and initialize the app.
  // Also reset the dialog state and selectedStop, if the URL changes.
  useEffect(() => {
    stopFromUrl && dispatch(initializeAppState(stopFromUrl));
    closeDialog();
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

  const HandleSaveSubmit = (stopKey, customName) => {
    localStorage.setItem(
      stopKey,
      JSON.stringify({
        userStopName: customName,
        stopName: selectedStop.name,
      })
    );
    setStopSavedToBrowser(true);
    closeDialog();
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
            {!stopSavedToBrowser && !dialogOpen && (
              <Button handleOnClick={() => openDialog()}>
                Save stop to browser
              </Button>
            )}
            {dialogOpen && (
              <MyStopDialog
                stopKey={selectedStop.shortName}
                nameValue={""}
                onSaveCancel={() => closeDialog()}
                onSaveSubmit={HandleSaveSubmit}
              >
                Save to my stops
              </MyStopDialog>
            )}

            {renderedBusses}
          </Fragment>
        )}
      </div>
    </div>
  );
}
