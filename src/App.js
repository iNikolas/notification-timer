import "./App.module.css";
import useLocalStorage from "./common/hooks/useLocalStorage";
import React, { useEffect } from "react";
import css from "./App.module.css";
import TimerForm from "./features/TimerForm/TimerForm";
import Timer from "./features/Timer/Timer";

function App() {
  const [hours, setHours] = useLocalStorage("hours", 0);
  const [minutes, setMinutes] = useLocalStorage("minutes", 0);
  const [seconds, setSeconds] = useLocalStorage("seconds", 0);
  const [startingTime, setStartingTime] = useLocalStorage("startingTime", 0);
  const [isWorking, setIsWorking] = useLocalStorage("isWorking", false);
  const [isPaused, setIsPaused] = useLocalStorage("isPaused", false);
  const [time, setTime] = useLocalStorage("time", 0);

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };
  const handleMinutesChange = (event) => {
    if (+event.target.value > 59) {
      setMinutes(0);
      return setHours(+hours + 1);
    }
    if (+event.target.value < 0) {
      setMinutes(59);
      return +hours >= 1 ? setHours(hours - 1) : null;
    }
    setMinutes(event.target.value);
  };
  const handleSecondsChange = (event) => {
    if (+event.target.value > 59) {
      setSeconds(0);
      return setMinutes(+minutes + 1);
    }
    if (+event.target.value < 0) {
      setSeconds(59);
      return +minutes >= 1 ? setMinutes(minutes - 1) : null;
    }
    setSeconds(event.target.value);
  };
  const handleTimerSet = () => {
    const timerSeconds = hours * 60 * 60 + minutes * 60 + Number(seconds);
    setTime(timerSeconds);
  };
  const handlePause = () => {
    if (isPaused) {
      setStartingTime(new Date().getTime());
    }
    setIsPaused(!isPaused);
  };
  const toggleTimer = () => {
    if (isWorking) {
      setStartingTime(null);
    } else {
      setStartingTime(new Date().getTime());
    }
    setIsWorking(!isWorking);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isWorking) handleTimerSet();
  }, [hours, minutes, seconds, isWorking]);

  return (
    <div className={css["main-wrapper"]}>
      <Timer
        time={time}
        startingTime={startingTime}
        isWorking={isWorking}
        isPaused={isPaused}
        setTime={setTime}
        setStartingTime={setStartingTime}
      />
      <TimerForm
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        handleHoursChange={handleHoursChange}
        handleMinutesChange={handleMinutesChange}
        handleSecondsChange={handleSecondsChange}
        toggleTimer={toggleTimer}
        isWorking={isWorking}
        isPaused={isPaused}
        handlePause={handlePause}
      />
    </div>
  );
}

export default App;
