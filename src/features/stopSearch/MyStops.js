import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./MyStops.module.css";

// TODO: asettaa storen globaaliin tilaan valitun pysäkin tiedot. Sisäinen tila???

const MyStops = (props) => {
  return <div className={styles.myStops}>My stops component</div>;
};

export default MyStops;
