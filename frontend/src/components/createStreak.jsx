import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postStreakActions } from "../actions/streakActions";
import { toast, ToastContainer } from "react-toastify";
export const CreateStreak = () => {
  const [isShown, setIsShown] = useState(false);
  const [streakName, setStreakName] = useState("");
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.postStreak
  );

  const postStreakHandler = (e) => {
    e.preventDefault();
    const formData = { streakName, goal };
    dispatch(postStreakActions(formData));
  };

  const showHandler = (e) => {
    e.preventDefault();
    if (isShown) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  };

  return (
    <div>
      <form className="fixed bottom-10 right-10">
        <button
          onClick={showHandler}
          className="rounded-full border-4 bg-yellow-200 h-20 w-20 text-2xl hover:bg-yellow-300 transition-all duration-300 hover:scale-110"
        >
          ➕
        </button>
      </form>

      {isShown ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-96 shadow-xl overflow-hidden">
            <div className="flex justify-end items-center p-1">
              <button onClick={showHandler}>
                <svg
                  height="21"
                  viewBox="0 0 21 21"
                  width="21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    transform="translate(5 5)"
                  >
                    <path d="m10.5 10.5-10-10z" />
                    <path d="m10.5.5-10 10" />
                  </g>
                </svg>
              </button>
            </div>
            <div className="p-8">
              <h1 className="text-2xl font-extrabold text-neutral-700 py-4">
                Add your streak
              </h1>
              <form onSubmit={postStreakHandler}>
                <label className="flex w-full my-2 text-neutral-800">⚡ Name of Streak ⚡</label>
                <input
                  className="border-2 rounded-lg w-80 p-4 my-2 border-neutral-400focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 "
                  placeholder="Enter your streak name..."
                  onChange={(e) => setStreakName(e.target.value)}
                />
                <label className="flex w-full my-2 text-neutral-800"> 🎯 Goal of Streak 🎯</label>
                <input
                  className="border-2 rounded-lg w-80 p-4 border-neutral-400focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 "
                  placeholder="Goal for this streak..."
                  onChange={(e) => setGoal(e.target.value)}
                />
                <br />
                <button
                  className="my-2 p-2 w-60 bg-yellow-200 rounded-lg font-bold text-neutral-600 transition-all duration-300 hover:bg-yellow-300 "
                >
                  Start your Streak{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
