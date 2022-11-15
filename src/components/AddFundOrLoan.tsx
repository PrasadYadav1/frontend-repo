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

type Props = {
  name: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddFundOrLoan({ name }: Props) {
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
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

  const handleSubmit = async () => {
    let modifiedDate = dateValue.toISOString().slice(0, 10).replace(/-/g, "-");
    const data = {
      capital: amount,
      date: modifiedDate + "",
    };
    try {
      const result = await axios.post(
        "http://103.242.116.207:9000/api/cash-flow/first-create",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (result.status === 200) {
        setAlertOpen(true);
        setOpen(false);
        setTimeout(() => refreshPage(), 2000);
      } else {
        setAlertErrorOpen(true);
        setOpen(false);
      }
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
      <Snackbar
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
      </Snackbar>
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
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
