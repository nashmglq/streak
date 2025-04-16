import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./screen/landingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {

  
  const clientId = process.env.REACT_APP_CLIENT_ID;
  console.log(clientId)
  return (
    <div className="App">
      <BrowserRouter>
      {/* client = {} must be same */}
        <GoogleOAuthProvider clientId={clientId}>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
