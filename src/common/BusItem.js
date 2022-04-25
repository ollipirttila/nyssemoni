import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getStopDataSet } from "../features/stopSearch/stopSearchSlice";

import { getFormattedTime, getDifferenceInTime } from "../utils/dateTime.js";

import styles from "./BusItem.module.css";

// TODO: asettaa storen globaaliin tilaan valitun pysäkin tiedot. Sisäinen tila???

const BusItem = (props) => {
  const stopData = useSelector(getStopDataSet);

  const differenceFromScheduledDeparture = (expectedTime, scheduledTime) => {
    const timeDifference = getDifferenceInTime(expectedTime, scheduledTime);
    const minuteStr = Math.abs(timeDifference) > 1 ? " minutes" : " minute";
    const delayType =
      timeDifference > 0 ? " behind schedule" : " ahead of schedule";
    if (timeDifference != 0) {
      return Math.abs(timeDifference) + minuteStr + delayType;
    }
    return "On schedule";
  };

  const getStopName = (shortName) => {
    return stopData.filter((item) => item.shortName === shortName)[0].name;
  };

  return (
    <div className={styles.busItem}>
      <div className={styles.busItemLine}>
        {props.busData.lineRef} -{" "}
        {getStopName(props.busData.destinationShortName)}
      </div>
      <div>
        Leaving from stop:{" "}
        {getFormattedTime(props.busData.call.expectedDepartureTime)}
      </div>
      <div>
        Scheduled departure:{" "}
        {getFormattedTime(props.busData.call.aimedDepartureTime)}
      </div>
      <div>
        {differenceFromScheduledDeparture(
          props.busData.call.expectedDepartureTime,
          props.busData.call.aimedDepartureTime
        )}
      </div>
    </div>
  );
};

export default BusItem;
