import React, { useEffect } from "react";
import { CreateStreak } from "../components/createStreak";
import { useDispatch, useSelector } from "react-redux";
import { getStreakActions } from "../actions/streakActions";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getStreak
  );
  useEffect(() => {
    dispatch(getStreakActions());
    dispatch({ type: 'RESET_STATE' });
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen py-8 md:py-12">
      {message && Array.isArray(message) && message.length > 0 ? (
        <div className="flex flex-wrap justify-center sm:justify-start">
          {message.map((streaks) => (
            <Link
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 m-2 sm:m-4 block"
              to={`/streak/${streaks.streakId}`}
            >
              <div className="flex flex-col bg-white items-center border-2 rounded-lg w-full p-4 text-lg shadow-md hover:scale-105 transition-all duration-300 h-full">
                <div className="flex justify-center items-center border-4 border-yellow-400 rounded-full text-neutral-800 w-16 h-16 md:w-20 md:h-20">
                  <h1>{streaks.currentStreak}</h1>
                </div>
                <h1 className="mt-2 text-center">{streaks.streakName}</h1>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 md:h-96">
          <h1 className="font-thin text-center px-4">
            No streaks yet, add your first streak now !⚡
          </h1>
        </div>
      )}
      <CreateStreak />
    </div>
  );
};
