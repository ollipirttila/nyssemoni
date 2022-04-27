import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button onClick={() => props.handleOnClick()} className={styles.button}>
      {props.children}
    </button>
  );
};

export default Button;
