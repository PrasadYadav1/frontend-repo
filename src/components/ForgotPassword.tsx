import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
// material ui

import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "../css/ForgotPassword.css";

import userService from "../services/userService";

const ForgotPassword = () => {
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
  const [forgot, setForgot] = useState(false);
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

        <Box sx={{ width: "120%", maxWidth: 500 }}>
          <Typography variant="h3" gutterBottom>
            h3. Heading
          </Typography>
          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>
          <Typography variant="h5" gutterBottom>
            h5. Heading
          </Typography>
          <Typography variant="h6" gutterBottom>
            h6. Heading
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }
};
export default ForgotPassword;
