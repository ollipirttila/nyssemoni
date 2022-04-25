import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./SelectedStopItem.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCoffee } from "@fortawesome/free-solid-svg-icons";

const SelectedStopItem = (props) => {
  const [showCloseSelection, setShowCloseSelection] = useState(false);

  return (
    <div
      className={styles.selectedStopItem}
      onClick={() => props.onDeselect(null)}
      onMouseEnter={() => setShowCloseSelection(true)}
      onMouseLeave={() => setShowCloseSelection(false)}
    >
      <div className={styles.selectedStopItemTitle}>Selected stop</div>
      <div className={styles.selectedStopItemValue}>
        {props.stopData.name + " – " + props.stopData.shortName}
      </div>
      {showCloseSelection ? (
        <div className={styles.selectedStopItemCloseSelection}>
          <FontAwesomeIcon icon={faClose} size="xl" />
        </div>
      ) : null}
    </div>
  );
};

export default SelectedStopItem;
