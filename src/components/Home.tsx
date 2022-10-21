import React from "react";
import userService from "../services/userService";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AuthService from "../services/AuthService";

export default class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    userService.getUser(70).then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const data = AuthService.getCurrentUser();
    return (
      <>
        <Box className="" pt={{ xs: 4, sm: 4 }} pb={{ xs: 2, sm: 4 }} mt="12">
          <Grid container spacing={2} justifyContent="center" marginTop={12}>
            <div className="container">
              <Typography variant="h3">
                isLoggedIn: {data.isLoggedIn}
              </Typography>{" "}
              <Typography variant="h3">ID: {this.state.content.id}</Typography>{" "}
              <br />
              <Typography variant="h5">
                Name: {this.state.content.firstName}
              </Typography>
              <Typography variant="h5">
                Email: {this.state.content.email}
              </Typography>
              <Typography variant="h5">
                Gender: {this.state.content.gender}
              </Typography>
              <Typography variant="h5">
                Mobile: {this.state.content.primaryMobile}
              </Typography>
            </div>
          </Grid>
        </Box>
      </>
    );
  }
}
