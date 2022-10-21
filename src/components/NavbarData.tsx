import HomeIcon from "@mui/icons-material/Home";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

export const NavBarData = [
  {
    title: "Employee's Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Organizational Chart",
    path: "/orgchart",
    icon: <AccountTreeIcon />,
  },
  {
    title: "Leave Management",
    path: "/leavemanagement",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Finance Management",
    path: "/financemanagement",
    icon: <LocalLibraryIcon />,
  },
  {
    title: "Learning & Development",
    path: "/learningdevelopment",
    icon: <CastForEducationIcon />,
  },
];
