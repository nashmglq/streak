import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailStreakActions } from "../actions/streakActions";

export const TimeCoolDown = ({ time, id }) => {
  const [calculate, setCalculate] = useState(0);
  const [run, isRun] = useState(true)
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getDetailStreak
  );

  useEffect(() => {
    const calcu = () => {
      const currentLocalTime = new Date(); // PH time
      const utcOffsetMinutes = 8 * 60; // PH is UTC+8, so this is 480 minutes (8 hr * 60 mins)
      const incorrectPHTime = new Date(
        currentLocalTime.getTime() + utcOffsetMinutes * 60 * 1000
      ); // (utcOffsetMinutes * 60 * 1000) to get ms
      // whole date - ms

      const diff = new Date(time) - incorrectPHTime;

      if(diff == 0){
        isRun(false)
      }
      setCalculate(diff);
    };
    calcu();




    if (run) {
      const intervalId = setInterval(calcu, 1000);
      const clearOldTimer = () => {
        clearInterval(intervalId);
      };
      return clearOldTimer;
    }


  }, [message.coolDownTimer, dispatch]);

  const hours = Math.floor((calculate / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((calculate / (1000 * 60)) % 60);
  const seconds = Math.floor((calculate / 1000) % 60);

  return (
    <div>
      {hours == 0 && minutes == 0 && seconds == 0 ? (
        "⚡Streak⚡"
      ) : (
        <p className="text-xl">
          {`${hours >= 10 ? hours : `0${hours}`} : ${
            minutes >= 10 ? minutes : `0${minutes}`
          } : ${seconds >= 10 ? seconds : `0${seconds}`}`}
        </p>
      )}
    </div>
  );
};
