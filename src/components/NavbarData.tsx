import HomeIcon from "@mui/icons-material/Home";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import TaskIcon from "@mui/icons-material/Task";

export const NavBarData = [
  {
    title: "Employee's Home",
    path: "/landingpage",
    icon: <HomeIcon />,
  },
  {
    title: "Organizational Chart",
    path: "/landingpage/orgchart",
    icon: <AccountTreeIcon />,
  },
  {
    title: "Leave Management",
    path: "/landingpage/leavemanagement",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Finance Management",
    path: "/landingpage/financemanagement",
    icon: <LocalLibraryIcon />,
  },
  {
    title: "Learning & Development",
    path: "/landingpage/learningdevelopment",
    icon: <CastForEducationIcon />,
  },
  {
    title: "Task Master",
    path: "/landingpage/tasks",
    icon: <TaskIcon />,
  },
];
