import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route index element={<Login />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="signup" element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <div>
        <LandingPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
