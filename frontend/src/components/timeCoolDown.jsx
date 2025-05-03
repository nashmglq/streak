import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailStreakActions } from "../actions/streakActions";

export const TimeCoolDown = ({ time, id }) => {
  const [calculate, setCalculate] = useState(0);
  const [run, setRun] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const calcu = () => {
      const currentLocalTime = new Date();
      const utcOffsetMinutes = 8 * 60; // PH is UTC+8 (480 minutes)
      const philippinesTime = new Date(
        currentLocalTime.getTime() + utcOffsetMinutes * 60 * 1000
      );

      const targetTime = new Date(time);

      const diff = targetTime - philippinesTime;

      if (diff <= 0) {
        setRun(false);
        setCalculate(0);

        dispatch(getDetailStreakActions(id));
        return;
      }

      setCalculate(diff);
    };

    calcu();

    let intervalId = null;
    if (run) {
      intervalId = setInterval(calcu, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [time, id, run, dispatch]);

  useEffect(() => {
    if (time) {
      setRun(true);
    }
  }, [time]);

  const hours = Math.floor((calculate / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((calculate / (1000 * 60)) % 60);
  const seconds = Math.floor((calculate / 1000) % 60);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return <span className="text-xl">⚡Streak⚡</span>;
  }

  return (
    <p className="text-xl">
      {`${hours >= 10 ? hours : `0${hours}`} : ${
        minutes >= 10 ? minutes : `0${minutes}`
      } : ${seconds >= 10 ? seconds : `0${seconds}`}`}
    </p>
  );
};
