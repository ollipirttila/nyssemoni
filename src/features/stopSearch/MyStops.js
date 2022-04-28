import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyStopDialog from "../../common/MyStopDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import styles from "./MyStops.module.css";

const MyStops = (props) => {
  let navigate = useNavigate();
  const [keys, setKeys] = useState(Object.keys(localStorage));
  const [openEditDialog, setOpenEditDialog] = useState([]);

  const deleteSavedStop = (key) => {
    localStorage.removeItem(key);
    setKeys(Object.keys(localStorage));
  };

  const toggleEditDialog = (key) => {
    openEditDialog.length === 0
      ? setOpenEditDialog([key])
      : setOpenEditDialog([]);
  };

  const HandleEditSubmit = (key, customName) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        userStopName: customName,
        stopName: JSON.parse(localStorage[key]).stopName,
      })
    );
    toggleEditDialog();
  };

  const getSavedStops = () => {
    const savedStops = [];
    keys.forEach((key) => {
      savedStops.push(
        <Fragment>
          <div className={styles.myStopsItemsRow}>
            <div
              onClick={() => navigate(`/?stop=${key}`)}
              className={styles.myStopsItem}
            >
              {JSON.parse(localStorage[key]).userStopName} –{" "}
              {JSON.parse(localStorage[key]).stopName + " / " + key}
            </div>

            <div
              onClick={() => toggleEditDialog(key)}
              className={styles.editItem}
            >
              <FontAwesomeIcon
                className={styles.editIcon}
                icon={faPen}
                size="sm"
              />
            </div>

            <div
              onClick={() => deleteSavedStop(key)}
              className={styles.deleteItem}
            >
              <FontAwesomeIcon
                className={styles.deleteIcon}
                icon={faTrash}
                size="sm"
              />
            </div>
          </div>
          {openEditDialog.find((item) => item === key) ? (
            <MyStopDialog
              stopKey={key}
              nameValue={JSON.parse(localStorage[key]).userStopName}
              onSaveCancel={toggleEditDialog}
              onSaveSubmit={HandleEditSubmit}
            >
              Edit my stop
            </MyStopDialog>
          ) : null}
        </Fragment>
      );
    });
    return savedStops;
  };
  return (
    <div className={styles.myStops}>
      <div className={styles.myStopsDescription}>
        You can store your most used stops into browser memory.
      </div>
      <div className={styles.MystopsItemContainer}>{getSavedStops()}</div>
    </div>
  );
};

export default MyStops;
