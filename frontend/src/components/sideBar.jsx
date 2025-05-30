import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, User, Menu, X } from "lucide-react";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      <button 
        onClick={toggleSidebar} 
        className="fixed top-1 left-4 z-50 block lg:hidden text-neutral-400 p-2 rounded-md"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      
      <aside className={`fixed top-0 left-0 z-40 w-18 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gray-50 dark:bg-gray-800`}>
        <div className="h-full px-3 py-8 overflow-y-auto">
          <ul className="space-y-6 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex justify-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
              >
                <img src="icon.png" alt="Dashboard" className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex justify-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
              >
                <User size={24} />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex justify-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
                onClick={logoutHandler}
              >
                <LogOut size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};