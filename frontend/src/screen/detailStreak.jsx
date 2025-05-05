import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailStreakReducer } from "../reducer/streakReducer";
import { useEffect, useState } from "react";
import {
  addStreakCountActions,
  getDetailStreakActions,
} from "../actions/streakActions";
import { TimeCoolDown } from "../components/timeCoolDown";
import { TrophyIcon, FlameIcon, CalendarIcon, ArrowUpIcon } from "lucide-react";
import { AiResponse } from "../components/aiResponse";

export const DetailStreak = () => {
  const [signal, isSignal] = useState(false);
  const { id } = useParams();
  const streakId = id;
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getDetailStreak
  );

  const addStreakButton = (e) => {
    e.preventDefault();
    const formData = { streakId };
    dispatch(addStreakCountActions(formData));
  };

  useEffect(() => {
    dispatch(getDetailStreakActions(id));
  }, [dispatch, id]);

  const calculateDaysSince = (startDate) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {message ? (
        <div className="container mx-auto py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg border border-neutral-200 overflow-hidden">
              {/* Header */}
              <div className="bg-yellow-50 p-6 border-b border-yellow-100">
                <h1 className="text-2xl font-bold text-neutral-800">
                  {message.streakName}
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  Started {new Date(message.streakStarted).toLocaleDateString()}
                </p>
                <div className="text-xs text-neutral-500 mt-2">
                  <span> Last update:                    {message.lastActionTime
                        ? new Date(message.lastActionTime).toLocaleDateString()
                        : "Never"}</span>
                </div>
              </div>

              {/* Main content */}
              <div className="p-6 flex flex-col items-center">
                {/* Current streak counter */}
                <div className="flex items-center justify-center text-2xl font-bold text-neutral-700 rounded-full border-2 border-yellow-200 w-40 h-40 mb-6 bg-yellow-50">
                  <div className="text-center">
                    <FlameIcon
                      className="inline-block mb-1 text-yellow-500"
                      size={24}
                    />
                    <div className="text-3xl">{message.currentStreak || 0}</div>
                    <div className="text-sm font-normal">Days</div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 gap-1 w-full mb-6">
                  <div className="bg-neutral-50 p-3 rounded-lg text-center shadow-sm">
                    <div className="text-sm text-neutral-500">Best Streak</div>
                    <div className="flex justify-center items-center mt-1">
                      <TrophyIcon className="text-yellow-500 mr-1" size={16} />
                      <span className="font-bold">
                        {message.highestStreak || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Goal section */}
                <div className="w-full mb-6 bg-neutral-50 p-4 rounded-lg">
                  <h3 className="text-sm uppercase text-neutral-500 font-medium mb-2">
                    My Goal
                  </h3>
                  <p className="text-neutral-700 text-sm">{message.goal}</p>
                </div>

                {/* Action button */}
                {message.coolDown ? (
                  <button
                    className="w-full p-4 rounded-lg shadow-md bg-neutral-300 text-neutral-600 cursor-not-allowed flex items-center justify-center"
                    disabled
                  >
                    <TimeCoolDown
                      time={message.coolDownTimer}
                      id={id}
                      signal={message.coolDown}
                    />
                  </button>
                ) : (
                  <button
                    onClick={addStreakButton}
                    className="w-full p-4 rounded-lg shadow-md bg-yellow-400 font-bold text-neutral-800 transition-all duration-300 hover:bg-yellow-500 flex items-center justify-center"
                  >
                    <FlameIcon className="mr-2" size={20} />
                    Add Streak Day
                  </button>
                )}
              </div>
              <AiResponse streakId={id} />
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-neutral-600">
          Empty streak here ⚡
        </div>
      )}
    </div>
  );
};
