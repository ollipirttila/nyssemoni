import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={styles.button} onClick={props.onClickHandler()}>
      {props.children}
    </button>
  );
};

export default Button;
