import React, { useEffect } from "react";
import userService from "../services/userService";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AuthService from "../services/AuthService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

var data: any;

function Home() {
  const navigate = useNavigate();
  const Logout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const currUser = AuthService.getCurrentUser();

    userService.getUser(Number(currUser.userId)).then(
      (response) => {
        setIsLoading(false);
        data = response.data;
        // console.log(data);
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
        <Grid container spacing={2} justifyContent="center" marginTop={12}>
          {/* <div className="container">
            <Typography variant="h3">ID: {data.id}</Typography> <br />
            <Typography variant="h5">Name: {data.firstName}</Typography>
            <Typography variant="h5">Email: {data.email}</Typography>
            <Typography variant="h5">Gender: {data.gender}</Typography>
            <Typography variant="h5">Mobile: {data.primaryMobile}</Typography>
          </div> */}
          <Typography variant="h3">Home Page</Typography>
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            onClick={Logout}
          >
            Logout
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
