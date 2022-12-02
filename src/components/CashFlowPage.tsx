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
import AddFundOrLoan from "./AddFundOrLoan";
import { MouseEvent, useState } from "react";
import { Modal, Typography } from "@mui/material";
import { useGetAllCashFlow } from "../hooks/useGetAllCashFlow";

export default function CashFlowPage() {
  const cashFlowData = useGetAllCashFlow(
    'http://103.242.116.207:9000/cash-flow/all'
  );
  // const cashFlowColumns = columnsData(cashFlowRows);
  const [expenseRows] = useFetch("http://103.242.116.207:9000/expense/all");
  // const expenseColumns = columnsData(expenseRows);
  const [revenueRows] = useFetch("http://103.242.116.207:9000/revenue/all");
  // const revenueColumns = columnsData(revenueRows);
  const [inflowModalInfo, setInflowModalInfo] = useState([]);
  const [outflowModalInfo, setOutflowModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  
  //open modal on clicking date
  function handleButtonClick(cashFlowRowData:any) {
    setInflowModalInfo(cashFlowRowData.inflow);
    setOutflowModalInfo(cashFlowRowData.outflow);
    setShowModal(true);
  }
  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
      <div style={{ display: "inline-block", width: "100%" }}>
        <h4 style={{ float: "left", fontSize: "15px" }}>Cash Flow Table</h4>
        <div style={{ float: "right" }}>
          <Stack spacing={2} direction="row">
            <InputCapitalDialog />
            <AddFundOrLoan name={"Add Loan"} />
            <AddFundOrLoan name={"Add Funding"} />
          </Stack>
        </div>
      </div>
      <ReactTable rows={cashFlowData}  
      columns={[
        {
            id: 1,
            field: "date",
            label: "Date",
            width: "auto",
            cellRenderer: ({
            tableManager,
            value,
            data,
            column,
            colIndex,
            rowIndex,
            }: any) => (
            <div className="rgt-cell-inner rgt-text-truncate" title="date" onClick={e => handleButtonClick(data)}>
              <div> {data.date}</div>
            </div>
          ),
        },
       {
          id: 2,
          field: "capital",
          label: "Capital",
          width: "auto",
          cellRenderer: ({
            tableManager,
            value,
            data,
            column,
            colIndex,
            rowIndex,
          }: any) => (
            <div className="rgt-cell-inner rgt-text-truncate" title="capital">
              <div>&#8377; {data.capital}</div>
            </div>
          ),
       },
       {
        id: 3,
        field: "inFlow",
        label: "Inflow",
        width: "auto",
        cellRenderer: ({
          tableManager,
          value,
          data,
          column,
          colIndex,
          rowIndex,
        }: any) => (
          <div className="rgt-cell-inner rgt-text-truncate" title="inFlow">
            <div>&#8377; {data.totalInflow}</div>
          </div>
        ),
      },
      {
        id: 4,
        field: "outFlow",
        label: "Outflow",
        width: "auto",
        cellRenderer: ({
          tableManager,
          value,
          data,
          column,
          colIndex,
          rowIndex,
        }: any) => (
          <div className="rgt-cell-inner rgt-text-truncate" title="outFlow">
            <div>&#8377; {data.totalOutflow}</div>
          </div>
        ),
      },
       {
          id: 6,
          field: "adjustment",
          label: "Adjustment",
          width: "auto",
          cellRenderer: ({
            tableManager,
            value,
            data,
            column,
            colIndex,
            rowIndex,
          }: any) => (
            <div className="rgt-cell-inner rgt-text-truncate" title="funding">
              <div>&#8377; {data.adjustment}</div>
            </div>
          ),
        },
        {
          id: 7,
          field: "balance",
          label: "Balance",
          width: "auto",
          cellRenderer: ({
            tableManager,
            value,
            data,
            column,
            colIndex,
            rowIndex,
          }: any) => (
            <div className="rgt-cell-inner rgt-text-truncate" title="balance">
              <div>&#8377; {data.balance}</div>
            </div>
          ),
        }
     ]} />
     
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
      {showModal &&  <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="Cash-Flow-Modal"
        aria-describedby="Cash-Flow-Modal"
      >
        <Box sx={style}>
        <div style={{ display: "inline-block"}}> InFlow:{inflowModalInfo.map(inflow => <div>&#8377;{inflow}</div>)}<br/></div>
        <div style={{ float: "right" }}>OutFlow:{outflowModalInfo.map(outflow => <div>-&#8377;{outflow}</div>)}</div>
        </Box>
      </Modal>
    </div>}
    </>
  );
}