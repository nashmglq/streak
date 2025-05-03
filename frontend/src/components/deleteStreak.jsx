import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteStreakActions} from "../actions/streakActions"
export const DeleteStreak = ({ streakId, closeModal }) => {
  const [show, isShow] = useState(true); 
  const dispatch = useDispatch();
  const {loading, success, error, message} = useSelector(state => state.deleteStreak)
  
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteStreakActions(streakId))
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
        <form>
          <label className="block mb-4">Are you sure you want to delete this streak?</label>
          <div className="flex space-x-4">
            <button 
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};