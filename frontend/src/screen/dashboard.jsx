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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {message.map((streak) => (
            <Link
              key={streak.streakId}
              to={`/streak/${streak.streakId}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden border border-gray-100">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex justify-center items-center bg-yellow-50 text-yellow-600 font-semibold w-12 h-12 rounded-full">
                      {streak.currentStreak}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 truncate">{streak.streakName}</h3>
                      <p className="text-xs text-gray-500">Goal: {streak.goal}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span>Highest: {streak.highestStreak}</span>
                    <span className={streak.coolDown ? "text-blue-500" : "text-green-500"}>
                      {streak.coolDown ? "Cooling down" : "Ready"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 md:h-96">
          <div className="text-center px-4">
            <p className="text-gray-500 mb-2">No streaks yet</p>
            <p className="font-light text-gray-400">Add your first streak now! ⚡</p>
          </div>
        </div>
      )}
      <CreateStreak />
    </div>
  );
};