import React from "react";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";

const LandingPage = () => {
  const [authenticated, setauthenticated] = useState<any | null>(null);
  const navigate = useNavigate();
  // parsing jwt token
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // checking whether user logged in or not
  useEffect(() => {
    // check user logged in or not
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      // if logged in then check token expiry time
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const decodedJwt = parseJwt(accessToken);
        // if token expired then logout
        if (decodedJwt.exp * 1000 < Date.now()) {
          Logout();
        }
        // if token not expired then set authentication true.
        else {
          setauthenticated(loggedInUser);
        }
      }
    }
  }, []);

  const Logout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  // console.log(authenticated);
  if (authenticated) {
    return (
      <div>
        <h3>Welcome To Landing page</h3>
        <Button variant="contained" onClick={Logout}>
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <div className="">
        <h3>Not Logged In</h3>
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
      </div>
    );
  }
};

export default LandingPage;
