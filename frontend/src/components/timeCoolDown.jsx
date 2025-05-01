import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailStreakActions } from "../actions/streakActions";

export const TimeCoolDown = ({ time, id }) => {
  const [calculate, setCalculate] = useState(0);
  const [run, setRun] = useState(true);
  const dispatch = useDispatch();
  
  // Set up timer calculation and refresh logic
  useEffect(() => {
    // Calculate the time difference
    const calcu = () => {
      // Get current time with Philippines timezone adjustment (UTC+8)
      const currentLocalTime = new Date();
      const utcOffsetMinutes = 8 * 60; // PH is UTC+8 (480 minutes)
      const philippinesTime = new Date(
        currentLocalTime.getTime() + utcOffsetMinutes * 60 * 1000
      );
      
      // Target time from the coolDownTimer prop
      const targetTime = new Date(time);
      
      // Calculate time difference in milliseconds
      const diff = targetTime - philippinesTime;
      
      // If timer has expired
      if (diff <= 0) {
        setRun(false);
        setCalculate(0);
        
        // Refresh the streak data from the server
        dispatch(getDetailStreakActions(id));
        return;
      }
      
      setCalculate(diff);
    };

    // Run calculation immediately
    calcu();
    
    // Set up timer interval
    let intervalId = null;
    if (run) {
      intervalId = setInterval(calcu, 1000);
    }
    
    // Clean up interval on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [time, id, run, dispatch]);

  // Reset the run state when time prop changes
  useEffect(() => {
    if (time) {
      setRun(true);
    }
  }, [time]);

  // Calculate hours, minutes, seconds for display
  const hours = Math.floor((calculate / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((calculate / (1000 * 60)) % 60);
  const seconds = Math.floor((calculate / 1000) % 60);

  // Format display based on timer state
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