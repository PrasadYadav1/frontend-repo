import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  name: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddAdjustment({ name }: Props) {
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const [schedule, setSchedule] = React.useState(0);
  const [source, setSources] = React.useState("");
  const [repayFlag, setRepayFlag] = React.useState("");
  const [repayType, setRepayType] = React.useState("");
  const [adjustmentType, setAdjustmentType] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = React.useState(false);
  const [error, setError] = React.useState("Oops! Some Error Occurred");

  function refreshPage() {
    window.location.reload();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue: any) => {
    setDateValue(newValue);
  };

  const handleRepayFlagChange = (e: any) => {
    setRepayFlag(e.target.value);
  };

  const handleRepayTypeChange = (e: any) => {
    setRepayType(e.target.value);
  };

  const handleAdjustmentTypeChange = (e: any) => {
    setAdjustmentType(e.target.value);
  };
  const handleSubmit = async () => {
    let modifiedDate = dateValue.toISOString();
    const data = {
      amount: amount,
      transactionDate: modifiedDate + "",
      adjustmentType: adjustmentType,
      source: source,
      repayRequired: repayFlag,
      schedule: schedule,
      repayType: repayType,
    };
    try {
      fetch("http://103.242.116.207:9000/adjustment/create", {
        method: "POST",
        headers: AuthHeader(),
        body: JSON.stringify(data),
      }).then((result) => {
        if (result.status === 200) {
          setAlertOpen(true);
          setOpen(false);
        } else {
          setAlertErrorOpen(true);
          setOpen(false);
        }
      });
    } catch (err: any) {
      const errorString = err.response.data;
      setError(
        errorString.substring(0, 1).toUpperCase() + errorString.substring(1)
      );
      setAlertErrorOpen(true);
      setOpen(false);
    }
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleClickOpen}
        >
          {name}
        </Button>
      </Stack>
      {open && (
        <Dialog scroll="paper" open={open} onClose={handleClose}>
          <DialogTitle sx={{ color: "black" }}>{name} Amount</DialogTitle>
          <DialogContent dividers={true}>
            <Stack spacing={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Select a Date"
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  onChange={handleDateChange}
                  renderInput={(params: any) => (
                    <TextField {...params} name="transactionDate" />
                  )}
                />
              </LocalizationProvider>
              <TextField
                id="amount"
                name="amount"
                label="Amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value === "" ? 0 : parseInt(e.target.value)
                  )
                }
              />
              <TextField
                id="source"
                name="source"
                label="Source"
                value={source}
                onChange={(e) =>
                  setSources(e.target.value === "" ? "" : e.target.value)
                }
              />
              <InputLabel id="adjustment-type">Adjustment Type</InputLabel>
              <Select onChange={(e) => handleAdjustmentTypeChange(e)}>
                <MenuItem value="" selected disabled hidden>
                  Select here
                </MenuItem>
                <MenuItem value="CapitalInfusion">Capital Infusion</MenuItem>
                <MenuItem value="shortTermLoan">Short Term Loan</MenuItem>
                <MenuItem value="longTermLoan">Long Term Loan</MenuItem>
                <MenuItem value="Funding">Funding</MenuItem>
              </Select>
              <InputLabel id="repay-flag">Repay Required</InputLabel>
              <Select onChange={(e) => handleRepayFlagChange(e)}>
                <MenuItem value="" selected disabled hidden>
                  Select here
                </MenuItem>
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
              <InputLabel id="repay-type">Repay Type</InputLabel>
              <Select onChange={(e) => handleRepayTypeChange(e)}>
                <MenuItem value="" selected disabled hidden>
                  Select here
                </MenuItem>
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                <MenuItem value={"Annually"}>Annually</MenuItem>
                <MenuItem value={"FixedTerm"}>Fixed Term</MenuItem>
              </Select>
              <TextField
                id="schedule"
                name="schedule"
                label="Schedule"
                value={schedule}
                onChange={(e) =>
                  setSchedule(
                    e.target.value === "" ? 0 : parseInt(e.target.value)
                  )
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
      {alertOpen && (
        <Snackbar
          open={alertOpen}
          autoHideDuration={5000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Adjustment Amount Added Successfully
          </Alert>
        </Snackbar>
      )}
      {alertErrorOpen && (
        <Snackbar
          open={alertErrorOpen}
          autoHideDuration={5000}
          onClose={() => setAlertErrorOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAlertErrorOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}, Cannot add adjustment amount
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

function AuthHeader(): {} {
  const user = JSON.parse(window.localStorage.getItem("isLoggedIn") || "");
  const accessToken = JSON.parse(window.localStorage.getItem("token") || "");

  //   if user token is logged in
  if (user && accessToken) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
  } else {
    return {};
  }
}
