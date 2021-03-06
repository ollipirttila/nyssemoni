import React, { useState } from "react";

import styles from "./MyStopDialog.module.css";

const MyStopDialog = (props) => {
  const [customName, setCustomName] = useState(props.nameValue);
  return (
    <div className={styles.myStopDialog}>
      <div className={styles.description}>{props.children}</div>

      <label htmlFor="stopname" className={styles.label}>
        Name your stop
      </label>
      <input
        type="text"
        placeholder="E.g. 'To Home'"
        name="stopname"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className={styles.input}
      />
      <button
        className={styles.buttonSecondary}
        onClick={() => props.onSaveCancel()}
      >
        Cancel
      </button>
      <button
        className={styles.buttonPrimary}
        onClick={() => props.onSaveSubmit(props.stopKey, customName)}
      >
        Save
      </button>
    </div>
  );
};

export default MyStopDialog;
