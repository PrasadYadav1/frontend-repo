import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { expenseTypes } from "./componentsData/expenseType";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { revenueTypes } from "./componentsData/revenueTypes";

type Props = {
  data: any;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const changeDateFormat = (date: string) => {
  const array = date.toString().split("-");
  const finalString = array[0].toUpperCase() + " " + array[1] + ", " + array[2];
  return finalString;
};

export default function EditDialog({ data }: Props) {
  const [open, setOpen] = React.useState(false);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = React.useState(false);

  const dataType = "expenseNumber" in data ? true : false;

  function refreshPage() {
    window.location.reload();
  }
  const [enableDate, setEnableDate] = React.useState(false);
  const [enableRecipient, setEnableRecipient] = React.useState(false);
  const [enableBank, setEnableBank] = React.useState(false);
  const [enableAmount, setEnableAmount] = React.useState(false);
  const [enableRecurringExpenses, setEnableRecurringExpenses] =
    React.useState(false);
  const [enableRecurringExpenseType, setEnableRecurringExpenseType] =
    React.useState(false);
  const [enableRepeatInstance, setEnableRepeatInstance] = React.useState(false);
  const [enableExpenseType, setEnableExpenseType] = React.useState(false);
  const [enableTransactionID, setEnableTransactionID] = React.useState(false);
  const [enabledebitChequeNo, setEnabledebitChequeNo] = React.useState(false);
  const [enableTransactionDescription, setEnableTransactionDescription] =
    React.useState(false);
  const [confirmButton, setConfirmButton] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(data.transactionDate);
  const [recipient, setRecipient] = React.useState(data?.recipient);
  const [bank, setBank] = React.useState(data.bankName);
  const [amount, setAmount] = React.useState(data.amount);
  const [recurringExpenses, setRecurringExpenses] = React.useState(
    data?.recurringExpense
  );
  const [expenseType, setExpenseType] = React.useState(data?.expenseType);
  const [repeatExpenseType, setRepeatExpenseType] = React.useState(
    data?.repeatExpenseType
  );
  const [repeatInstance, setRepeatInstance] = React.useState(
    data.repeatInstance
  );
  const [transactionID, setTransactionID] = React.useState(data.transactionId);
  const [debitChequeNo, setDebitChequeNo] = React.useState(data?.debitChequeNo);
  const [transactionDescription, setTransactionDescription] = React.useState(
    data.transactionDescription
  );
  const [enablePayer, setEnablePayer] = React.useState(false);
  const [enableRecurringRevenues, setEnableRecurringRevenues] =
    React.useState(false);
  const [enableRecurringRevenueType, setEnableRecurringRevenueType] =
    React.useState(false);
  const [payer, setPayer] = React.useState(data?.payer);
  const [recurringRevenue, setRecurringRevenue] = React.useState(
    data?.recurringRevenue
  );
  const [repeatRevenueType, setRepeatRevenueType] = React.useState(
    data?.repeatRevenueType
  );
  const [revenueType, setRevenueType] = React.useState(data?.revenueType);
  const [enableRevenueType, setEnableRevenueType] = React.useState(false);
  const [enableCreditChequeNo, setEnableCreditChequeNo] = React.useState(false);
  const [creditChequeNo, setCreditChequeNo] = React.useState(
    data?.creditChequeNo
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue: any) => {
    console.log(newValue);
    setDateValue(newValue);
  };

  const handleSubmit = async () => {
    let modifiedDate = dateValue;
    if (enableDate) {
      modifiedDate = dateValue.toISOString();
      console.log(modifiedDate);
    }
    const updatedData = dataType
      ? {
          amount: parseInt(amount),
          bankName: bank,
          debitChequeNo: debitChequeNo,
          expenseType: expenseType,
          recipient: recipient,
          recurringExpense: recurringExpenses,
          repeatExpenseType: repeatExpenseType,
          repeatInstance: parseInt(repeatInstance),
          transactionDate: modifiedDate,
          transactionDescription: transactionDescription,
          transactionId: transactionID,
        }
      : {
          amount: parseInt(amount),
          bankName: bank,
          creditChequeNo: creditChequeNo,
          revenueType: revenueType,
          payer: payer,
          recurringRevenue: recurringRevenue,
          repeatRevenueType: repeatRevenueType,
          repeatInstance: parseInt(repeatInstance),
          transactionDate: modifiedDate,
          transactionDescription: transactionDescription,
          transactionId: transactionID,
        };
    try {
      const result = await axios.put(
        dataType
          ? `http://103.242.116.207:9000/expense/${data.id}`
          : `http://103.242.116.207:9000/revenue/${data.id}`,
        updatedData
      );

      if (result.status === 200) {
        console.log(updatedData);
        setAlertOpen(true);
        setOpen(false);
        setTimeout(() => refreshPage(), 2000);
      } else {
        setAlertErrorOpen(true);
        setOpen(false);
      }
    } catch (err) {
      console.log(updatedData);
      setAlertErrorOpen(true);
    }
  };

  return (
    <div>
      <Tooltip title="Edit">
        <button
          style={{ marginLeft: 15 }}
          onClick={handleClickOpen}
          name="editButton"
        >
          <EditIcon fontSize="inherit" />
        </button>
      </Tooltip>
      <Dialog scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "black", width: "400px" }}>
          Edit {dataType ? "Expense" : "Revenue"} - {data.id}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            Select the fields that you want to edit.
          </DialogContentText>
          <Stack spacing={3}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={confirmButton}
                    onChange={() => setEnableDate(!enableDate)}
                  />
                }
                label="Date"
              />
              {dataType ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() => setEnableRecipient(!enableRecipient)}
                    />
                  }
                  label="Recipient"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() => setEnablePayer(!enablePayer)}
                    />
                  }
                  label="Payer"
                />
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    disabled={confirmButton}
                    onChange={() => setEnableBank(!enableBank)}
                  />
                }
                label="Bank"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={confirmButton}
                    onChange={() => setEnableAmount(!enableAmount)}
                  />
                }
                label="Amount"
              />
              {dataType ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() =>
                        setEnableRecurringExpenses(!enableRecurringExpenses)
                      }
                    />
                  }
                  label="Recurring Expenses"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() =>
                        setEnableRecurringRevenues(!enableRecurringRevenues)
                      }
                    />
                  }
                  label="Recurring Revenues"
                />
              )}
              {dataType ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() =>
                        setEnableRecurringExpenseType(
                          !enableRecurringExpenseType
                        )
                      }
                    />
                  }
                  label="Recurring Expense type"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() =>
                        setEnableRecurringRevenueType(
                          !enableRecurringRevenueType
                        )
                      }
                    />
                  }
                  label="Recurring Revenue type"
                />
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={confirmButton}
                    onChange={() =>
                      setEnableRepeatInstance(!enableRepeatInstance)
                    }
                  />
                }
                label="Repeat Instance"
              />
              {dataType ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() => setEnableExpenseType(!enableExpenseType)}
                    />
                  }
                  label="Expense Type"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() => setEnableRevenueType(!enableRevenueType)}
                    />
                  }
                  label="Revenue Type"
                />
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={confirmButton}
                    onChange={() =>
                      setEnableTransactionID(!enableTransactionID)
                    }
                  />
                }
                label="Transaction ID"
              />
              {dataType ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() =>
                        setEnabledebitChequeNo(!enabledebitChequeNo)
                      }
                    />
                  }
                  label="Debit Cheque Number"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={confirmButton}
                      onChange={() =>
                        setEnableCreditChequeNo(!enableCreditChequeNo)
                      }
                    />
                  }
                  label="Credit Cheque Number"
                />
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={confirmButton}
                    onChange={() =>
                      setEnableTransactionDescription(
                        !enableTransactionDescription
                      )
                    }
                  />
                }
                label="Transaction Description"
              />
            </FormGroup>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              disabled={confirmButton}
              onClick={() => setConfirmButton(true)}
            >
              Confirm
            </Button>
          </Stack>
        </DialogContent>
        <DialogContent dividers={true}>
          <Stack spacing={3}>
            <DialogContentText>
              Enter into the selected fields.
            </DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disabled={!(enableDate && confirmButton)}
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
            {dataType ? (
              <TextField
                disabled={!(enableRecipient && confirmButton)}
                id="recipient"
                name="recipient"
                label="Recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            ) : (
              <TextField
                disabled={!(enablePayer && confirmButton)}
                id="payer"
                name="payer"
                label="Payer"
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
              />
            )}
            <TextField
              disabled={!(enableBank && confirmButton)}
              id="bankName"
              name="bankName"
              label="Bank"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
            <TextField
              disabled={!(enableAmount && confirmButton)}
              id="amount"
              name="amount"
              label="Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <InputLabel id="demo-simple-select-label">
              {dataType ? "Recurring Expenses" : "Recurring Revenues"}
            </InputLabel>
            {dataType ? (
              <Select
                disabled={!(enableRecurringExpenses && confirmButton)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="recurringExpense"
                value={recurringExpenses}
                onChange={(e) => setRecurringExpenses(e.target.value)}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            ) : (
              <Select
                disabled={!(enableRecurringRevenues && confirmButton)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="recurringRevenue"
                value={recurringRevenue}
                onChange={(e) => setRecurringRevenue(e.target.value)}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            )}
            <Autocomplete
              disabled={
                !(dataType
                  ? enableExpenseType && confirmButton
                  : enableRevenueType && confirmButton)
              }
              id="combo-box-demo"
              options={dataType ? expenseTypes : revenueTypes}
              value={dataType ? expenseType : revenueType}
              sx={{ width: "100%" }}
              onChange={(event: any, newValue: string | null) => {
                dataType ? setExpenseType(newValue) : setRevenueType(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={
                    !(dataType
                      ? enableExpenseType && confirmButton
                      : enableRevenueType && confirmButton)
                  }
                  label={dataType ? "Expense Type" : "Revenue Type"}
                  name={dataType ? "expenseType" : "revenueType"}
                />
              )}
            />
            <InputLabel id="demo-simple-select-label">
              {dataType ? "Recurring Expense Type" : "Recurring Revenue Type"}
            </InputLabel>
            {dataType ? (
              <Select
                disabled={!(enableRecurringExpenseType && confirmButton)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="repeatExpenseType"
                value={repeatExpenseType}
                onChange={(e) => setRepeatExpenseType(e.target.value)}
              >
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                <MenuItem value={"Annually"}>Annually</MenuItem>
              </Select>
            ) : (
              <Select
                disabled={!(enableRecurringRevenueType && confirmButton)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="repeatRevenueType"
                value={repeatRevenueType}
                onChange={(e) => setRepeatRevenueType(e.target.value)}
              >
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                <MenuItem value={"Annually"}>Annually</MenuItem>
              </Select>
            )}
            <TextField
              disabled={!(enableRepeatInstance && confirmButton)}
              id="repeatInstance"
              name="repeatInstance"
              label="Repeat Instance"
              value={repeatInstance}
              onChange={(e) => setRepeatInstance(e.target.value)}
            />
            <TextField
              disabled={!(enableTransactionID && confirmButton)}
              id="transactionId"
              name="transactionId"
              label="Transaction ID"
              value={transactionID}
              onChange={(e) => setTransactionID(e.target.value)}
            />
            <TextField
              disabled={
                !(dataType
                  ? enabledebitChequeNo && confirmButton
                  : enableCreditChequeNo && confirmButton)
              }
              id={dataType ? "debitChequeNo" : "creditChequeNo"}
              name={dataType ? "debitChequeNo" : "creditChequeNo"}
              label={dataType ? "Debit Cheque Number" : "Credit Cheque Number"}
              value={dataType ? debitChequeNo : creditChequeNo}
              onChange={(e) =>
                dataType
                  ? setDebitChequeNo(e.target.value)
                  : setCreditChequeNo(e.target.value)
              }
            />
            <TextField
              disabled={!(enableTransactionDescription && confirmButton)}
              id="transactionDescription"
              name="transactionDescription"
              label="Transaction Description"
              value={transactionDescription}
              onChange={(e) => setTransactionDescription(e.target.value)}
            />
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
          {dataType
            ? "Expense Edited Successfully"
            : "Revenue Edited Successfully"}
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
          Oops! Some Error Occurred
        </Alert>
      </Snackbar>
    </div>
  );
}
