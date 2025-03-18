import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import MainPage from "./components/MainPage/MainPage"; 
import LivePage from "./components/LivePage/LivePage"; // Import LivePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/main" element={<MainPage />} /> 
        <Route path="/live" element={<LivePage />} /> {/* Add LivePage Route */}
        <Route path="*" element={<Registration />} /> {/* Default to Registration Page */}
      </Routes>
    </Router>
  );
}

export default App;
