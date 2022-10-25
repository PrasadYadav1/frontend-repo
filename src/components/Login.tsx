import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
// material ui

import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css";
import axios from "../api/axios";
import AuthService from "../services/AuthService";
import { Email } from "@mui/icons-material";
import userService from "../services/userService";
const LOGIN_URL = "/sign-in";

const Login = () => {
  // for form
  const [email, setEmail] = useState<any | null>(null);
  const [password, setPassword] = useState<any | null>(null);

  let currDate = new Date();

  // variables
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const passwordRef = React.createRef<HTMLInputElement>();
  const userRef = React.createRef<HTMLInputElement>();

  //authenticated or not
  const [authenticated, setauthenticated] = useState<any | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail(userRef.current?.value);
    setPassword(passwordRef.current?.value);

    // check email registered or not
    // userService.findUserByEmail(email).then(
    //   (response) => {
    //     // setIsLoading(false);
    //   },
    //   (error) => {
    //     // error.response && error.response.data
    //     setErrMsg("Email Not registered");
    //     return;
    //   }
    // );
    // console.log(userService.findUserByEmail(email));

    AuthService.login(email, password).then(
      () => {
        navigate("/landingpage");
      },
      (err) => {
        console.log(err);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Invalid Email or password");
        } else {
          setErrMsg("Login Failed");
        }

        setLoading(false);
      }
    );

    //   // storing token in local storage
    //   const decodedJwt = parseJwt(response?.data.token);

    //   console.log(decodedJwt.exp);
  };

  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // font color change
  if (authenticated) {
    return <Navigate replace to="/landingpage" />;
  } else {
    return (
      <>
        <Header />
        <Grid
          className="gradient-color"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "600px",
          }}
        >
          {/* <Grid item xs={2}>
          left part
        </Grid> */}

          <Grid item xs={8}>
            <div className="box">
              <form
                autoComplete="off"
                className="login-box"
                onSubmit={handleSubmit}
              >
                <h2 className="text-2xl"> Sign In</h2>

                {/* user email field */}
                <div className="inputBox">
                  <TextField
                    autoComplete="off"
                    type="email"
                    required
                    inputRef={userRef}
                    id="email"
                    label="Email"
                    variant="standard"
                    className="userEmail"
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "orange",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "orange",
                      },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
                  />
                </div>

                {/* password field */}
                <div className="inputBox">
                  <TextField
                    required
                    autoComplete="off"
                    inputRef={passwordRef}
                    id="password"
                    label="Password"
                    variant="standard"
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "orange",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "orange",
                      },
                    }}
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{ color: "white" }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* forgot pass and sign up links */}
                <div className="links">
                  <Link to="#">Forgot Password ?</Link>
                  <Link to="/signup" className="text-white">
                    Signup
                  </Link>
                </div>

                {/* error message */}

                {errMsg == "" ? (
                  ""
                ) : (
                  <Alert sx={{ height: "50px" }} severity="error">
                    {errMsg}
                  </Alert>
                )}

                {/* login button */}
                <input
                  className="bg-blue-500 login-button"
                  type="submit"
                  value="Login"
                />

                <div className="google-btn ml-32">
                  <div className="google-icon-wrapper mr-2">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <p className="btn-text pb-2">
                    <b className="">Sign in with google</b>
                  </p>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>

        <Footer />
      </>
    );
  }
};
export default Login;
