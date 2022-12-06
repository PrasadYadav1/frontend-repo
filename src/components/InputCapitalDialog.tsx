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
import useFetch from "./useFetch";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const changeDateFormat = (date: string) => {
  const array = date.toString().split("-");
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthFormat = parseInt(array[1]);
  const finalString =
    months[monthFormat - 1] + " " + array[2] + ", " + array[0];
  return finalString;
};

export default function InputCapitalDialog() {
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = React.useState(false);
  const [error, setError] = React.useState("Oops! Some Error Occurred");
  const [cashFlowData] = useFetch(
    "http://103.242.116.207:9000/api/cash-flow/all"
  );

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
  const handleSubmit = async () => {
    let modifiedDate = dateValue.toISOString();
  
    const data = {
      capital: amount,
      date: modifiedDate,
    };

    try {
      fetch("http://103.242.116.207:9000/capital/first-create",{
        method:'POST',
        headers: AuthHeader(),
        body:JSON.stringify(data)
      }).then((result) =>{
        if (result.status === 200) {
        setAlertOpen(true);
        setOpen(false);
        refreshPage();
      } else {
        setAlertErrorOpen(true);
        setOpen(false);
      }})
    } catch (err: any) {
      const errorString = err.response.data;
      setError(
        errorString.substring(0, 1).toUpperCase() + errorString.substring(1)
      );
      setAlertErrorOpen(true);
      setOpen(false);
    }
  }
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleClickOpen}
        >
          Input Starting Capital
        </Button>
      </Stack>
      <Dialog scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "black" }}>
          Input Starting Capital
        </DialogTitle>
        <DialogContent dividers={true}>
          <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select a Date"
                inputFormat="MM/DD/YYYY"
                value={dateValue}
                onChange={handleDateChange}
                maxDate={new Date()}
                renderInput={(params: any) => (
                  <TextField {...params} name="transactionDate" />
                )}
              />
            </LocalizationProvider>
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount"
              InputProps={{
                inputProps: {
                  min: 1,
                },
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? 0 : parseInt(e.target.value))
              }
            />
            <h4 style={{ color: "red" }}>
              *Starting Capital to be updated only during the launch of
              business/capital
            </h4>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {alertOpen &&<Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Capital Added Successfully
        </Alert>
      </Snackbar>}
      <Snackbar
        open={alertErrorOpen}
        autoHideDuration={3000}
        onClose={() => setAlertErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Sorry! Capital Already Exists.
        </Alert>
      </Snackbar>
    </div>
  );
      }
function AuthHeader():{}{
  const user = JSON.parse(window.localStorage.getItem("isLoggedIn") || "");
  const accessToken = JSON.parse(window.localStorage.getItem("token") || "");

  //   if user token is logged in.
  if (user && accessToken) {
    return { "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken} ;
  } else {
    return {};
  }
}

