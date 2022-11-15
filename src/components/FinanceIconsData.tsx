
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

 export const FinanceIconsData=[
    {
      name:" Employees",
      icon:<GroupAddOutlinedIcon 
        sx={{
            color:"#ee735c",
            marginLeft: 2,
            height: 30,
            width: 25,
            background: "#ffffff",
            borderRadius: 70,
            cursor: "pointer",
        }}/>,
      path:'./employees',
    },
    {
      name:"Projects",
      icon:<Diversity3Icon 
       sx={{
          color:"#ee735c",
          marginLeft: 2,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}/>,
      path:'./projects',
    },
    {
        name:" Cash Flow",
        icon:<CurrencyExchangeOutlinedIcon
        sx={{
          color:"#ee735c",
          marginLeft: 2,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}/>,
        path:'./cashflow',
    },
    {
        name:" Budgeting",
        icon:<CreditScoreIcon 
        sx={{
          color:"#ee735c",
          marginLeft: 2,
          textDecoration:"none",
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}/>,
        path:'./budgeting',
    },
    {
        name:" Dashboard",
        icon: <DashboardCustomizeIcon
        sx={{
          color:"#ee735c",
          marginLeft: 2,
          height: 30,
          width: 25,
          background: "#ffffff",
          borderRadius: 70,
          cursor: "pointer",
        }}/>,
        path:'./dashboard',
    },
]