import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./SelectedStopItem.module.css";

const SelectedStopItem = (props) => {
  return (
    <div
      className={styles.selectedStopItem}
      onClick={() => props.onDeselect(null)}
    >
      {props.stopData.name + " – " + props.stopData.shortName}
    </div>
  );
};

export default SelectedStopItem;
