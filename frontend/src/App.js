import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./screen/landingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Dashboard } from "./screen/dashboard";
import { ProtectedRouting } from "./utils/protectedRoutes";
import { Profile } from "./screen/profile";
import { DetailStreak } from "./screen/detailStreak";
import NotificationManager from "./components/notifications";
function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  console.log(clientId);
  return (
    <div className="App">
      <NotificationManager />
      <BrowserRouter>
        {/* client = {} must be same */}
        <GoogleOAuthProvider clientId={clientId}>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRouting>
                  <Dashboard />
                </ProtectedRouting>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRouting>
                  <Profile />
                </ProtectedRouting>
              }
            ></Route>
            <Route
              path="/streak/:id"
              element={
                <ProtectedRouting>
                  <DetailStreak />
                </ProtectedRouting>
              }
            ></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
