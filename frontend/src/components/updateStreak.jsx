import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStreakActions } from "../actions/streakActions";

export const UpdateStreak = ({ streak, closeModal }) => {
  const [show, isShow] = useState(true);
  const [streakName, setStreakName] = useState("");
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const {loading, success, error, message} = useSelector(state => state.updateStreak)
  const streakId = streak.streakId

  useEffect(() => {
    if (streak) {
      setStreakName(streak.streakName || "");
      setGoal(streak.goal || "");
    }
  }, [streak]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = {streakName, goal, streakId};
    dispatch(updateStreakActions(formData))

    isShow(false);
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    isShow(false);
    closeModal();
  };

  return (
    <div>
      {show && (
        <form onSubmit={handleUpdate}>
          <h3 className="text-lg font-medium mb-4">Update Streak</h3>

          <label className="block mb-2">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={streakName}
            onChange={(e) => setStreakName(e.target.value)}
          />

          <label className="block mb-2">Goal</label>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
