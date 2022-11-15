import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "@material-ui/core";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <Box
        textAlign="center"
        bgcolor="black"
        className="social-media-bg"
        pt={{ xs: 2, sm: 2 }}
        pb={{ xs: 1, sm: 1 }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item mx={{ xs: 2, sm: 2 }}>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/technoidentity-solutions-pvt-ltd/"
            >
              <LinkedInIcon
                style={{ color: "white" }}
                color="disabled"
                fontSize="large"
              />
            </Link>
          </Grid>
          <Grid item mx={{ xs: 2, sm: 2 }}>
            <Link
              target="_blank"
              href="https://www.facebook.com/technoidentitysolution/"
            >
              <FacebookIcon style={{ color: "white" }} fontSize="large" />
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box
        px={{ xs: 3, sm: 6 }}
        py={{ xs: 5, sm: 6 }}
        color="white"
        className="bg-footer"
      >
        <Container maxWidth={false}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={4} alignSelf="center">
                Help
              </Box>
              <Box>
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Contact Us
                </Link>
              </Box>
              <Box>
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Support
                </Link>
              </Box>
              <Box>
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Privacy
                </Link>
              </Box>
            </Grid>

            {/* second grid */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={4} justifyContent="center">
                Account
              </Box>
              <Box>
                <Link
                  href="/login"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Log In
                </Link>
              </Box>
              <Box>
                <Link
                  href="/signup"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Register
                </Link>
              </Box>
              {/* <Box>
                <Link to="#" color="inherit">
                  Privacy
                </Link>
              </Box> */}
            </Grid>

            {/* third grid */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={4}>Messages</Box>
              <Box>
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Backup
                </Link>
              </Box>
              <Box>
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  History
                </Link>
              </Box>
              <Box>
                <Link
                  href="#"
                  style={{ textDecoration: "none" }}
                  className="links-footer"
                >
                  Roll
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        textAlign="center"
        className="copyright"
        pt={{ xs: 4, sm: 4 }}
        pb={{ xs: 2, sm: 4 }}
      >
        <Grid container spacing={2} justifyContent="center">
          Copyright @2022
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
