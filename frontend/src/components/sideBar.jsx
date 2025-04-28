import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export const SideBar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
  };

  return (
    <div>
      <aside class="fixed top-0 left-0 z-40 w-10 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div class="h-full px-2 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                class="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 m-2"
              >
                <img src = "icon.png"/>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                class="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 m-2"
              >
                <User/>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                class="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 m-2"
                onClick={logoutHandler}
              >
               <LogOut/>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
