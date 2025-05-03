import React, { useEffect, useState, useRef } from "react";
import { CreateStreak } from "../components/createStreak";
import { useDispatch, useSelector } from "react-redux";
import { getStreakActions } from "../actions/streakActions";
import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { DeleteStreak } from "../components/deleteStreak";
import { UpdateStreak } from "../components/updateStreak";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.getStreak
  );

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);

  useEffect(() => {
    dispatch(getStreakActions());
    dispatch({ type: "RESET_STATE" });
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getStreakActions());
    }, 600000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e, streakId) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === streakId ? null : streakId);
  };

  const handleCloseModals = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen py-8 md:py-12">
      {message && Array.isArray(message) && message.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {message.map((streak) => (
            <div key={streak.streakId} className="relative">
              <Link to={`/streak/${streak.streakId}`} className="block">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden border border-gray-100">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex justify-center items-center bg-yellow-50 text-yellow-600 font-semibold w-12 h-12 rounded-full">
                        {streak.currentStreak}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 truncate">
                          {streak.streakName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Goal: {streak.goal}
                        </p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => toggleDropdown(e, streak.streakId)}
                          className="p-2 transition-all duration-300 hover:bg-gray-100 rounded-full hover:shadow-sm"
                        >
                          <EllipsisVertical size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <span>Highest: {streak.highestStreak}</span>
                      <span
                        className={
                          streak.coolDown ? "text-blue-500" : "text-green-500"
                        }
                      >
                        {streak.coolDown ? "Cooling down" : "Ready"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {activeDropdown === streak.streakId && (
                <div
                  ref={dropdownRef}
                  className="absolute right-2 top-14 bg-white rounded-md shadow-lg border border-gray-200 z-10 w-48"
                >
                  <div className="py-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedStreak(streak);
                        setShowUpdateModal(true);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2">✏️</span> Update Streak
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedStreak(streak);
                        setShowDeleteModal(true);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2">🗑️</span> Delete Streak
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 md:h-96">
          <div className="text-center px-4">
            <p className="text-gray-500 mb-2">No streaks yet</p>
            <p className="font-light text-gray-400">
              Add your first streak now! ⚡
            </p>
          </div>
        </div>
      )}
      <CreateStreak />

      {showUpdateModal && (
        <div
          onClick={() => setShowUpdateModal(false)}
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded shadow-lg"
          >
            <UpdateStreak
              streak={selectedStreak}
              closeModal={() => setShowUpdateModal(false)}
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          onClick={() => setShowDeleteModal(false)}
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded shadow-lg"
          >
            <DeleteStreak
              streakId={selectedStreak?.streakId}
              closeModal={() => setShowDeleteModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
