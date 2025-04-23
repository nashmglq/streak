import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailStreakReducer } from "../reducer/streakReducer";
import { useEffect } from "react";
import {
  addStreakCountActions,
  getDetailStreakActions,
} from "../actions/streakActions";
import { TimeCoolDown } from "../components/timeCoolDown";
export const DetailStreak = () => {
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
  }, [dispatch]);

  return (
    <div>
      {message ? (
        <div className="container mx-auto my-auto">
          <div className="flex flex-wrap justify-center items-center h-screen">
            <div className="flex flex-col items-center justify-center w-3/4 sm:w-1/4 bg-white shadow-lg h-1/2 sm:h-auto rounded-lg border-2 p-4">
              <div className="flex items-center justify-center text-xl font-bold text-neutral-700 rounded-full border-2 border-green-200 w-40 sm:w-40 h-40 sm:h-40">
                {message.currentStreak
                  ? `Day ${message.currentStreak}`
                  : "Day 0"}
              </div>

              {message.coolDown ? (
                <button
                  onClick={addStreakButton}
                  className="mt-8 p-4 rounded-lg w-full sm:w-autoshadow-lg bg-neutral-400 cursor-not-allowed transition-all transform active:translate-x-1 active:-translate-x-1" disabled
                >
                  <TimeCoolDown time = {message.coolDownTimer} id = {id}/>
                </button>
              ) : (
                <button
                  onClick={addStreakButton}
                  className="mt-8 p-4 rounded-lg shadow-lg bg-yellow-200 font-bold text-neutral-800 transition-all duration-300 hover:scale-110 
            hover:bg-yellow-300 w-full sm:w-auto
            "
                >
                  ⚡Streak⚡
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        "Empty streak here ⚡"
      )}
    </div>
  );
};
