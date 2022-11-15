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

import Tasks from "./components/Tasks";
import CashFlowPage from "./components/CashFlowPage";
import Employees from "./components/Employees";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Budgeting from "./components/Budgeting";

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
          <Route path="financemanagement" element={<FinanceManagement />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="cashflow" element={<CashFlowPage />} />
            <Route path="employees" element={<Employees />} />
            <Route index path="projects" element={<Projects />} />
            <Route index path="budgeting" element={<Budgeting />} />
          </Route>
          <Route path="leavemanagement" element={<LeaveManagement />} />
          <Route path="learningdevelopment" element={<LearningDevelopment />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
