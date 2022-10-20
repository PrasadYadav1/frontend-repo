import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import { NavBarData } from "./NavbarData";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import List from "@mui/material/List";

export default function SideNavPopup() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="SideNav Options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mr: 2, display: { sm: "none" } }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="inherit"
            aria-label="open drawer"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "#f1a39a",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            paddingLeft: "8px",
            paddingRight: "8px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 38,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <List>
          {NavBarData.map((data: any) => (
            <ListItem key={data.title} disablePadding>
              <Link
                to={data.path}
                style={{ textDecoration: "none", color: "white" }}
              >
                {data.icon}
                {data.title}
              </Link>
            </ListItem>
          ))}
        </List>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
