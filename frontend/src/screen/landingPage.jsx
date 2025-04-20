import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { googleAuthActions } from "../actions/authActions"; // Adjust path as needed

const LandingPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userInfo = localStorage.getItem("userInfo");


  const handleGoogleSuccess = (googleCredentials) => {
    dispatch(
      googleAuthActions({ credential: googleCredentials.credential }, nav)
    );
  };

  const handleGoogleError = () => {
    console.log("Google Authentication Error");
  };
  
  useEffect(() => {
    if (userInfo) nav("/dashboard");
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4 sm:p-6 md:p-10 lg:p-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm mb-3 sm:mb-4 md:mb-6">
          AI-Powered Streak Counter
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm mb-4 sm:mb-6">
          ⚡Streak⚡
        </h1>

        <div className="my-6">
          <GoogleLogin
            useOneTap
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signin_with"
            shape="rectangular"
            theme="filled_blue"
          />
        </div>

        <p className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-amber-400 via-yellow-900 to-amber-400 bg-clip-text text-transparent max-w-2xl mx-auto my-2">
          Click to streak. Get inspired. Stay healthy. See your progress.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
