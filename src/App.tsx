import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import LandingPage1 from "./components/LandingPage1";
import Organizations from "./components/Organization";
import Home from "./components/Home";
import FinanceManagement from "./components/FinanceManagement";
import LeaveManagement from "./components/LeaveManagement";
import LearningDevelopment from "./components/LearningDevelopment";
import NotFound from "./components/NotFound";
import Protected from "./components/Protected";
import SignUp from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />

        <Route
          path="/landingpage1"
          element={
            <Protected>
              <LandingPage1 />
            </Protected>
          }
        />

        <Route
          path="landingpage/*"
          element={
            <Protected>
              <LandingPage />
            </Protected>
          }
        >
          <Route index path="home" element={<Home />} />
          <Route path="orgchart" element={<Organizations />} />
          <Route path="financemanagement" element={<FinanceManagement />} />
          <Route path="leavemanagement" element={<LeaveManagement />} />
          <Route path="learningdevelopment" element={<LearningDevelopment />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
