import React from "react";
import { Link } from "react-router-dom";

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
                    transform="translate(2 2)"
                  >
                    <circle cx="8.5" cy="8.5" r="8" />
                    <path d="m14.5 13.5c-.6615287-2.2735217-3.1995581-3.0251263-6-3.0251263-2.72749327 0-5.27073171.8688092-6 3.0251263" />
                    <path d="m8.5 2.5c1.6568542 0 3 1.34314575 3 3v2c0 1.65685425-1.3431458 3-3 3-1.65685425 0-3-1.34314575-3-3v-2c0-1.65685425 1.34314575-3 3-3z" />
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                class="text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 m-2"
                onClick={logoutHandler}
              >
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
                    transform="matrix(-1 0 0 1 18 3)"
                  >
                    <path d="m10.595 10.5 2.905-3-2.905-3" />
                    <path d="m13.5 7.5h-9" />
                    <path d="m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c.0005616 1.1043502.8956499 1.9996898 2 2.0005615l8 .0022461" />
                  </g>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
