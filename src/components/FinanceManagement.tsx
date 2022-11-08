import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "./useFetch";
import ReactTable from "./ReactTable";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TransitionsModal from "./ModalComponent";
import { cashFlowColumns } from "./componentsData/cashFlowColumns";
import { expenseColumns } from "./componentsData/expenseColumns";
import { revenueColumns } from "./componentsData/revenueColumns";
import InputCapitalDialog from "./InputCapitalDialog";

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
  const [cashFlowRows] = useFetch(
    "http://103.242.116.207:9000/api/cash-flow/all"
  );
  // const cashFlowColumns = columnsData(cashFlowRows);
  const [expenseRows] = useFetch("http://103.242.116.207:9000/expense/all");
  // const expenseColumns = columnsData(expenseRows);
  const [revenueRows] = useFetch("http://103.242.116.207:9000/revenue/all");
  // const revenueColumns = columnsData(revenueRows);
  return (
    <>
      <div style={{ display: "inline-block", width: "100%" }}>
        <h4 style={{ float: "left", fontSize: "15px" }}>Cash Flow Table</h4>
        <div style={{ float: "right" }}>
          <InputCapitalDialog />
        </div>
      </div>
      <ReactTable rows={cashFlowRows} columns={cashFlowColumns} />
      <Box sx={{ flexGrow: 1, mt: "50px" }}>
        <Grid
          container
          spacing={{ xs: 6, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid xs={12} sm={12} md={6} lg={6}>
            <div style={{ textAlign: "center" }}>
              <h4 style={{ verticalAlign: "middle", fontSize: "15px" }}>
                Expense Table
              </h4>
            </div>
            <ReactTable rows={expenseRows} columns={expenseColumns} />
            <Grid>
              <Stack direction="row" alignItems="center" spacing={6} mt={2}>
                <Button variant="contained" component="label">
                  Upload Expense
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <TransitionsModal name={"Add Expense"} modalType={true} />
                {/* <ScrollDialog name={"Add Expense"} modalType={true} /> */}
              </Stack>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6}>
            <div style={{ textAlign: "center" }}>
              <h4 style={{ verticalAlign: "middle", fontSize: "15px" }}>
                Revenue Table
              </h4>
            </div>
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
      </Box>
    </>
  );
}

export default FinanceManagement;
