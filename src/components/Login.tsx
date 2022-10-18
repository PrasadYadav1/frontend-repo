import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Footer from "./Footer";
import ButtonGroup from "@mui/material/ButtonGroup";

const pages = ["Login", "SignUp"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Login = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const medium = {
    backgroundColor: "white",
    color: "black",
  };

  const styles = {
    root: {
      flexGrow: 1,
    },
    appbar: {
      alignItems: "center",
    },
  };
  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            backgroundColor: "black",
            height: { xs: "50px", sm: "80px" },
          }}
        >
          <img
            src="/home/technoidentity/Desktop/projects/ti-resource-x/public/tiLogo.jpeg"
            alt=""
          />
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
                align: "center",
                fontSize: { sm: "30px" },
              }}
            >
              <img
                src="/home/technoidentity/Desktop/projects/ti-resource-x/public/tiLogo.jpeg"
                alt=""
              />
              TI-ResourceX
            </Typography>
            <img
              src="/home/technoidentity/Desktop/projects/ti-resource-x/public/tiLogoNew.jpeg"
              alt=""
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Login;
