import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const getSavedStops = () => {
    const savedStops = [];
    keys.forEach((key) => {
      savedStops.push(
        <div key={key} className={styles.MystopsItemContainer}>
          <div className={styles.myStopsItemsRow}>
            <div
              onClick={() => navigate(`/?stop=${key}`)}
              className={styles.myStopsItem}
            >
              <span className={styles.userStopNameTitle}>
                {JSON.parse(localStorage[key]).userStopName} –
              </span>
              <span className={styles.stopNameTitle}>
                {JSON.parse(localStorage[key]).stopName} / {key}
              </span>
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
              nameValue={JSON.parse(localStorage[key]).userStopName}
              onSaveCancel={toggleEditDialog}
              onSaveSubmit={() => console.log("blooo")}
            >
              Edit my stop
            </MyStopDialog>
          ) : null}
        </div>
      );
    });
    return savedStops;
  };
  return (
    <div className={styles.myStops}>
      <div className={styles.myStopsDescription}>
        You can store your most used stops into browser memory.
      </div>
      {getSavedStops()}
    </div>
  );
};

export default MyStops;
