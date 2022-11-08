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

export default function InputCapitalDialog() {
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue: any) => {
    setDateValue(newValue);
  };

  const handleSubmit = () => {
    console.log(dateValue);
    console.log(amount);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={handleClickOpen}
      >
        Input Starting Capital
      </Button>
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
    </div>
  );
}
