import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import image from "../images/tiLogoNew.png";
import Grid from "@mui/material/Grid";
import "../css/Header.css";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: "black",
            height: { xs: "50px", sm: "80px" },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <Avatar
                  alt="technoIdentity"
                  src={image}
                  sx={{
                    width: { xs: 40, sm: 70 },
                    height: { xs: 40, sm: 70 },
                  }}
                />
              </Grid>

              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    justifyContent: "center",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",
                    textDecoration: "none",
                    align: "center",
                    fontSize: { sm: "30px" },
                    marginTop: "10px",
                  }}
                >
                  TI-ResourceX
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
        {/*scrolling text  */}
        <div id="scroll-container">
          <p className="text-center text-lg text-white" id="scroll-text">
            Your One Stop Solution For Employee Management
          </p>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
