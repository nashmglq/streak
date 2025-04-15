import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./screen/landingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GoogleOAuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
