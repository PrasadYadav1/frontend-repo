import FinanceIcons from "./FinanceIcons";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

function FinanceManagement() {
  return (
    <>
      <Stack spacing={2}>
        <div>
          <FinanceIcons />
        </div>
        <div style={{ marginTop: "100px" }}>
          <Outlet />
        </div>
      </Stack>
    </>
  );
}

export default FinanceManagement;
