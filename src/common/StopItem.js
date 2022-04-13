import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./StopItem.module.css";

// TODO: asettaa storen globaaliin tilaan valitun pysäkin tiedot. Sisäinen tila???

const StopItem = (props) => {
  return (
    <div
      className={styles.stopItem}
      onClick={() => props.onSelectStop(props.stopData)}
    >
      {props.stopData.name + " – " + props.stopData.shortName}
    </div>
  );
};

export default StopItem;
