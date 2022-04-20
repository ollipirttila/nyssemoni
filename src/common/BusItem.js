import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getFormattedTime, getDifferenceInTime } from "../utils/dateTime.js";

import styles from "./BusItem.module.css";

// TODO: asettaa storen globaaliin tilaan valitun pysäkin tiedot. Sisäinen tila???

const BusItem = (props) => {
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

  return (
    <div className={styles.busItem}>
      <div className={styles.busItemLine}>
        {props.busData.lineRef} - {props.busData.destinationShortName}
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
      <div>Status: {props.busData.call.departureStatus}</div>
    </div>
  );
};

export default BusItem;

{
  /* <div class="bus-container">
<div
  v-for="item in getStopMonitoringData"
  :key="item.vehicleRef"
  class="bus-item"
>
  <div class="bus-line">
    {{ item.lineRef }} {{ getStopName(item.destinationShortName) }}
  </div>
  <div>
    Leaving from stop:
    {{ getFormattedTime(item.call.expectedDepartureTime) }}
  </div>
  <div>
    {{
      differenceFromScheduledDeparture(
        item.call.expectedDepartureTime,
        item.call.aimedDepartureTime
      )
    }}
  </div>
  <div>
    Scheduled departure:
    {{ getFormattedTime(item.call.aimedDepartureTime) }}
  </div>
  <div>Status: {{ item.call.departureStatus }}</div>
</div>
</div> */
}
