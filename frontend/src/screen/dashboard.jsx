import React, { useEffect } from "react";
import { CreateStreak } from "../components/createStreak";
import { useDispatch, useSelector } from "react-redux";
import { getStreakActions } from "../actions/streakActions";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getStreak
  );
  useEffect(() => {
    dispatch(getStreakActions());
  }, [dispatch]);

  return (
    <div>
        {message && Array.isArray(message)
        ? message.map((streaks) => (
            <div>
              <h1>{streaks.streakName}</h1>
            </div>
          ))
        : "No streaks yet."}
      <CreateStreak />
      
    </div>
  );
};
