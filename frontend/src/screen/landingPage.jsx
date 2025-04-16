import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);

    fetch(
      `${
        process.env.REACT_APP_API_URL || "http://localhost:5000"
      }/auth/google/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && data.success.token) {
          localStorage.setItem("authToken", data.success.token);

          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google login failed:", error);
  };

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
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
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
