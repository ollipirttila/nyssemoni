import React from "react";

import stopIcon from "../assets/bus-stop.svg";

import styles from "./StopItem.module.css";

// TODO: asettaa storen globaaliin tilaan valitun pysäkin tiedot. Sisäinen tila???

const StopItem = (props) => {
  return (
    <div
      className={styles.stopItem}
      onClick={() => props.onSelectStop(props.stopData)}
    >
      <img
        alt="bus stop symbol"
        src={stopIcon}
        className={styles.stopItemLogo}
      />
      <div className={styles.stopName}>{props.stopData.name}</div>
      <div className={styles.stopShortName}>{props.stopData.shortName}</div>
    </div>
  );
};

export default StopItem;
