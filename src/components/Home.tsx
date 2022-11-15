import React, { useEffect } from "react";
import userService from "../services/UserService";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AuthService from "../services/AuthService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import UserService from "../services/UserService";
import { FirstPage } from "@mui/icons-material";

function Home() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const navigate = useNavigate();
  const Logout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  // update use api call
  const Update = () => {
    const id = window.localStorage.getItem("userId");
    // userService.updateUserdata(id);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const currUser = AuthService.getCurrentUser();
    // console.log(currUser);
    userService.getUser(Number(currUser.userId)).then(
      (response) => {
        setIsLoading(false);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
      },
      (error) => {
        // error.response && error.response.data
        setErrMsg(error.message || error.toString());
      }
    );
  }, []);

  return (
    <>
      <Box className="" pt={{ xs: 4, sm: 4 }} pb={{ xs: 2, sm: 4 }} mt="12">
        <Grid container spacing={4} justifyContent="center" marginTop={12}>
          <div className="container">
            <Typography variant="h3">Homepage</Typography> <br />
            <Alert severity="success">Welcome {firstName}!</Alert>
            <Typography variant="h5"></Typography>
            {/* <Typography variant="h3">ID: {data.id}</Typography> <br />
            <Typography variant="h5">Name: {data.firstName}</Typography>
            
            <Typography variant="h5">Gender: {data.gender}</Typography>
            <Typography variant="h5">Mobile: {data.primaryMobile}</Typography> */}
            {/* <Button
              sx={{ marginLeft: "10px" }}
              variant="contained"
              onClick={Update}
            >
              Update Data
            </Button>{" "} */}
            <br />
            <Button
              sx={{ marginLeft: "5px", width: "100px" }}
              variant="contained"
              onClick={Logout}
            >
              Logout
            </Button>
          </div>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
