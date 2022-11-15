import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

export const FinanceIconsData = [
  {
    name: "Employees",
    icon: (
      <GroupAddOutlinedIcon
        sx={{
          color: "#ee735c",
          marginLeft: 3.5,
          marginTop: 1.5,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 50,
        }}
      />
    ),
    path: "/landingpage/financemanagement/employees",
  },
  {
    name: "Projects",
    icon: (
      <Diversity3Icon
        sx={{
          color: "#ee735c",
          marginLeft: 3.8,
          marginTop: 1.5,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}
      />
    ),
    path: "/landingpage/financemanagement/projects",
  },
  {
    name: "Cash Flow",
    icon: (
      <CurrencyExchangeOutlinedIcon
        sx={{
          color: "#ee735c",
          marginLeft: 3.5,
          marginTop: 1.5,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}
      />
    ),
    path: "/landingpage/financemanagement/cashflow",
  },
  {
    name: "Budgeting",
    icon: (
      <CreditScoreIcon
        sx={{
          color: "#ee735c",
          marginLeft: 3.5,
          marginTop: 1.5,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}
      />
    ),
    path: "/landingpage/financemanagement/budgeting",
  },
  {
    name: "Dashboard",
    icon: (
      <DashboardCustomizeIcon
        sx={{
          color: "#ee735c",
          marginLeft: 3.5,
          marginTop: 1.5,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}
      />
    ),
    path: "/landingpage/financemanagement/dashboard",
  },
];
