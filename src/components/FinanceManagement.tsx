
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import TransitionsModal from "./ModalComponent";
import { cashFlowColumns } from "./componentsData/cashFlowColumns";
import { expenseColumns } from "./componentsData/expenseColumns";
import { revenueColumns } from "./componentsData/revenueColumns";
import FinanceIcons from './FinanceIcons';

// const columnsData = (rows: any) => {
//   const columns: any = [];
//   const row = rows[0];
//   let index = 0;
//   for (const key in row) {
//     if (key !== "capitalId" && key !== "expenseId" && key !== "revenueId") {
//       if (row.hasOwnProperty(key)) {
//         columns.push({
//           id: index,
//           field: key,
//           label: key.charAt(0).toUpperCase() + key.slice(1),
//         });
//       }
//       index++;
//     }
//   }
//   return columns;
// };


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

      
      {/* <ReactTable rows={cashFlowRows} columns={cashFlowColumns} />
      <Box sx={{ flexGrow: 1, mt: "50px" }}>
        <Grid
          container
          spacing={{ xs: 6, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid xs={12} sm={12} md={6} lg={6}>
            <ReactTable rows={expenseRows} columns={expenseColumns} />
            <Grid>
              <Stack direction="row" alignItems="center" spacing={6} mt={2}>
                <Button variant="contained" component="label">
                  Upload Expense
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <TransitionsModal name={"Add Expense"} modalType={true} />
              </Stack>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6}>
            <ReactTable rows={revenueRows} columns={revenueColumns} />
            <Grid>
              <Stack direction="row" alignItems="center" spacing={6} mt={2}>
                <Button variant="contained" component="label">
                  Upload Revenue
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <TransitionsModal name={"Add Revenue"} modalType={false} />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box> */}
   

