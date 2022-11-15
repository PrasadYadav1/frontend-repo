import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { NavBarData } from "./NavbarData";
import Home from "./Home";
import Organization from "./Organization";
import { Routes, useNavigate } from "react-router-dom";
import LeaveManagement from "./LeaveManagement";
import { Route, useLocation } from "react-router-dom";
import FinanceManagement from "./FinanceManagement";
import LearningDevelopment from "./LearningDevelopment";
import { Link } from "react-router-dom";
import SideNavPopup from "./SidenavPopup";
import Divider from "@mui/material/Divider";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import Tasks from "./Tasks";
import CashFlowPage from "./CashFlowPage";
import Employees from "./Employees";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Budgeting from "./Budgeting";
import { Button } from "@mui/material";

const drawerWidth = 240;

function LandingPage() {
  const navigate = useNavigate();

  const Logout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const { pathname } = useLocation();
  const drawer = (
    <div className="nav">
      <Toolbar />
      <List>
        {NavBarData.map((data: any) => (
          <ListItem key={data.title} disablePadding>
            {data.path === pathname ? (
              <Link to={data.path} style={{ color: "white" }}>
                {data.icon}
                {data.title}
              </Link>
            ) : (
              <Link to={data.path}>
                {data.icon}
                {data.title}
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#222",
          flexDirection: "row-reverse",
        }}
      >
        <Toolbar>
          <Stack spacing={2} direction="row">
            <Tooltip title="Alerts" arrow>
              <NotificationsActiveOutlinedIcon />
            </Tooltip>
            <Tooltip title="Profile" arrow>
              <PermContactCalendarOutlinedIcon />
            </Tooltip>
            <Tooltip title="Help" arrow>
              <QuizOutlinedIcon />
            </Tooltip>
            <Button
              sx={{ marginLeft: "10px", width: "80px", fontSize: "12px" }}
              variant="contained"
              onClick={Logout}
            >
              Logout
            </Button>
          </Stack>
          <SideNavPopup />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Divider />
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#4D51E6",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite;",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orgchart" element={<Organization />} />
          <Route path="/leavemanagement" element={<LeaveManagement />} />
          <Route path="financemanagement" element={<FinanceManagement />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="cashflow" element={<CashFlowPage />} />
            <Route path="employees" element={<Employees />} />
            <Route index path="projects" element={<Projects />} />
            <Route index path="budgeting" element={<Budgeting />} />
          </Route>
          <Route
            path="/learningdevelopment"
            element={<LearningDevelopment />}
          />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default LandingPage;
