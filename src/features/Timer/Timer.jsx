import React, { useEffect, useState } from "react";
import css from "./Timer.module.css";
import formatTimeLeft from "./formatTimeLeft";
import getRemainedTime from "./getRemainedTime";
import getProgressValue from "./progressCircleCalculations";
import setRemainingPathColor from "./setCircleColor";
import playNotification from "./playNotification";
import PropTypes from "prop-types";

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30;
const ALERT_THRESHOLD = 10;
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

function Timer(props) {
  const { time, startingTime, isWorking, isPaused, setTime } = props;
  const [timer, setTimer] = useState(null);
  const [notificationTimer, setNotificationTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(time);
  const [progressValue, setProgressValue] = useState(FULL_DASH_ARRAY);

  const remainingPathColor = setRemainingPathColor(timeLeft, COLOR_CODES);
  const formattedTimeLeft = formatTimeLeft(timeLeft);
  window.document.title = formattedTimeLeft;

  useEffect(() => {
    clearInterval(timer);
    if (isWorking) {
      if (!isPaused) {
        setTimeLeft(getRemainedTime(startingTime, time));
        setTimer(
          setInterval(() => {
            setTimeLeft(getRemainedTime(startingTime, time));
          }, 1000)
        );
      } else {
        setTime(timeLeft);
      }
    } else {
      setTimeLeft(time);
    }
  }, [isWorking, isPaused, time]);

  useEffect(() => {
    clearInterval(notificationTimer);
    setProgressValue(getProgressValue(timeLeft, time, FULL_DASH_ARRAY));
    if (!timeLeft && isWorking) {
      playNotification();
      setNotificationTimer(
        setInterval(() => {
          playNotification();
        }, 5000)
      );
    }
  }, [timeLeft, isWorking, time]);

  return (
    <div className={css["base-timer"]}>
      <svg
        className={css["base-timer__svg"]}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={css["base-timer__circle"]}>
          <circle
            className={css["base-timer__path-elapsed"]}
            cx="50"
            cy="50"
            r="45"
          />
          <path
            id={css["base-timer-path-remaining"]}
            strokeDasharray={`${progressValue} ${FULL_DASH_ARRAY}`}
            className={
              css["base-timer__path-remaining"] + " " + css[remainingPathColor]
            }
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          />
        </g>
      </svg>
      <span id={css["base-timer-label"]} className={css["base-timer__label"]}>
        {formattedTimeLeft}
      </span>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.number,
  startingTime: PropTypes.number,
  isWorking: PropTypes.bool,
  isPaused: PropTypes.bool,
  setTime: PropTypes.func,
};

export default Timer;
