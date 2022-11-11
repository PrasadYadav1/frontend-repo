import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import SearchDropdown from "./SearchDropdown";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { revenueTypes } from "./componentsData/revenueTypes";
import { expenseTypes } from "./componentsData/expenseType";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  name: string;
  modalType: boolean;
};

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchemaExpense = Yup.object({
  // transactionId: Yup.string().required("Transaction ID is required"),
  // transactionDate: Yup.date().required("Required").nullable(),
  // debitChequeNo: Yup.string().required("Debit Cheque Number is required"),
  // transactionDescription: Yup.string().required(
  //   "Transaction Description is required"
  // ),
  recipient: Yup.string().required("Recipient is required"),
  // expenseType: Yup.string().required("Expense Type is required"),
  amount: Yup.number().integer().min(1).required("Amount is Required"),
  recurringExpense: Yup.string().required("Recurring Expense is Required"),
  repeatExpenseType: Yup.string().required("Repeat Expense Type is Required"),
  repeatInstance: Yup.number()
    .integer()
    .min(1)
    .required("Repeat Instance is Required"),
});

const validationSchemaRevenue = Yup.object({
  // transactionId: Yup.string().required("Transaction ID is required"),
  // transactionDate: Yup.date().required("Required").nullable(),
  // creditChequeNo: Yup.string().required("Credit Cheque Number is required"),
  // transactionDescription: Yup.string().required(
  //   "Transaction Description is required"
  // ),
  payer: Yup.string().required("Payer is required"),
  // revenueType: Yup.string().required("Revenue Type is required"),
  amount: Yup.number().integer().min(1).required("Amount is Required"),
  recurringRevenue: Yup.string().required("Recurring Revenue is Required"),
  // repeatRevenueType: Yup.string().required("Repeat Revenue Type is Required"),
  // repeatInstance: Yup.number()
  //   .integer()
  //   .min(1)
  //   .required("Repeat Instance is Required"),
});

const style = {
  position: "absolute" as "absolute",
  top: "90%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid blue",
  boxShadow: 24,
  p: 4,
};

// function change_date(date: Date) {
//   const month = date.getUTCMonth() + 1;
//   const day = date.getUTCDate();
//   const year = date.getUTCFullYear();
//   const final_date = year + "-" + month + "-" + day;
//   return final_date;
// }

// const openAlert = (str: string) => alert(str);

export default function TransitionsModal({ name, modalType }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(new Date());
  const [clicked, setClicked] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = React.useState(false);
  const [expenseType, setExpenseType] = React.useState(expenseTypes[0]);
  const [revenueType, setRevenueType] = React.useState(revenueTypes[0]);

  function refreshPage() {
    window.location.reload();
  }

  const formikExpense = useFormik({
    initialValues: {
      transactionId: "",
      debitChequeNo: "",
      transactionDescription: "",
      recipient: "",
      bankName: "",
      amount: 0,
      recurringExpense: "No",
      repeatExpenseType: "Annually",
      repeatInstance: 1,
    },
    validationSchema: validationSchemaExpense,
    onSubmit: async (values: any, actions: any) => {
      const selectedDate = changeDateFormat(
        value.toISOString().slice(0, 10).replace(/-/g, "-")
      );
      values.transactionDate = selectedDate;
      values.amount = parseInt(values.amount);
      values.expenseType = expenseType;
      try {
        const result = await axios.post(
          "http://103.242.116.207:9000/expense/create",
          values,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (result.status === 200) {
          if (clicked === "Submit") {
            actions.resetForm();
            setAlertOpen(true);
            setOpen(false);
            setTimeout(() => refreshPage(), 2000);
          } else {
            actions.resetForm();
            setAlertOpen(true);
          }
        } else {
          setAlertErrorOpen(true);
          setOpen(false);
        }
      } catch (err) {
        setAlertErrorOpen(true);
      }
      console.log(values);
    },
  });

  const formikRevenue = useFormik({
    initialValues: {
      transactionId: "",
      creditChequeNo: "",
      transactionDescription: "",
      payer: "",
      bankName: "",
      // revenueType: revenueType,
      amount: 0,
      recurringRevenue: "No",
      repeatRevenueType: "Annually",
      repeatInstance: 1,
    },
    validationSchema: validationSchemaRevenue,
    onSubmit: async (values: any, actions: any) => {
      const selectedDate = changeDateFormat(
        value.toISOString().slice(0, 10).replace(/-/g, "-")
      );
      values.transactionDate = selectedDate;
      values.amount = parseInt(values.amount);
      values.revenueType = revenueType;
      try {
        const result = await axios.post(
          "http://103.242.116.207:9000/revenue/create",
          values,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (result.status === 200) {
          if (clicked === "Submit") {
            actions.resetForm();
            setAlertOpen(true);
            setOpen(false);
            setTimeout(() => refreshPage(), 2000);
          } else {
            actions.resetForm();
            setAlertOpen(true);
          }
        } else {
          setAlertErrorOpen(true);
          setOpen(false);
        }
      } catch (err) {
        setAlertErrorOpen(true);
      }
    },
  });

  const handleChange = (newValue: any) => {
    console.log(newValue);
    setValue(newValue);
  };

  // console.log(value);

  return (
    <div>
      <Button variant="contained" component="label" onClick={handleOpen}>
        {name}
      </Button>
      <Dialog scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "black" }}>{name}</DialogTitle>
        <DialogContent dividers={true}>
          <div>
            <form
              onSubmit={
                modalType
                  ? formikExpense.handleSubmit
                  : formikRevenue.handleSubmit
              }
            >
              <Stack spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Select a Date"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    maxDate={new Date()}
                    renderInput={(params: any) => (
                      <TextField {...params} name="transactionDate" />
                    )}
                  />
                </LocalizationProvider>

                <TextField
                  fullWidth
                  id={modalType ? "recipient" : "payer"}
                  name={modalType ? "recipient" : "payer"}
                  label={modalType ? "Recipient" : "Payer"}
                  value={
                    modalType
                      ? formikExpense.values.recipient
                      : formikRevenue.values.payer
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  error={
                    modalType
                      ? formikExpense.touched.recipient &&
                        Boolean(formikExpense.errors.recipient)
                      : formikRevenue.touched.payer &&
                        Boolean(formikRevenue.errors.payer)
                  }
                  helperText={
                    modalType
                      ? formikExpense.touched.recipient &&
                        formikExpense.errors.recipient
                      : formikRevenue.touched.payer &&
                        formikRevenue.errors.payer
                  }
                />
                <TextField
                  fullWidth
                  id="amount"
                  name="amount"
                  label="Amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  value={
                    modalType
                      ? formikExpense.values.amount
                      : formikRevenue.values.amount
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  error={
                    modalType
                      ? formikExpense.touched.amount &&
                        Boolean(formikExpense.errors.amount)
                      : formikRevenue.touched.amount &&
                        Boolean(formikRevenue.errors.amount)
                  }
                  helperText={
                    modalType
                      ? formikExpense.touched.amount &&
                        formikExpense.errors.amount
                      : formikRevenue.touched.amount &&
                        formikRevenue.errors.amount
                  }
                />
                <InputLabel id="demo-simple-select-label">
                  {modalType ? "Recurring Expenses" : "Recurring Revenues"}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={modalType ? "recurringExpense" : "recurringRevenue"}
                  value={
                    modalType
                      ? formikExpense.values.recurringExpense
                      : formikRevenue.values.recurringRevenue
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  error={
                    modalType
                      ? formikExpense.touched.recurringExpense &&
                        Boolean(formikExpense.errors.recurringExpense)
                      : formikRevenue.touched.recurringRevenue &&
                        Boolean(formikRevenue.errors.recurringRevenue)
                  }
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
                <InputLabel id="demo-simple-select-label">
                  {modalType ? "Recurring Expense Type" : "Repeat Revenue Type"}
                </InputLabel>
                <Select
                  disabled={
                    (modalType
                      ? formikExpense.values.recurringExpense
                      : formikRevenue.values.recurringRevenue) === "No"
                      ? true
                      : false
                  }
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={modalType ? "repeatExpenseType" : "repeatRevenueType"}
                  value={
                    modalType
                      ? formikExpense.values.repeatExpenseType
                      : formikRevenue.values.repeatRevenueType
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  error={
                    modalType
                      ? formikExpense.touched.repeatExpenseType &&
                        Boolean(formikExpense.errors.repeatExpenseType)
                      : formikRevenue.touched.repeatRevenueType &&
                        Boolean(formikRevenue.errors.repeatRevenueType)
                  }
                >
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                  <MenuItem value={"Annually"}>Annually</MenuItem>
                </Select>
                <TextField
                  disabled={
                    (modalType
                      ? formikExpense.values.recurringExpense
                      : formikRevenue.values.recurringRevenue) === "No"
                      ? true
                      : false
                  }
                  fullWidth
                  id="repeatInstance"
                  name="repeatInstance"
                  label="Repeat Instance"
                  value={
                    modalType
                      ? formikExpense.values.repeatInstance
                      : formikRevenue.values.repeatInstance
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  error={
                    modalType
                      ? formikExpense.touched.repeatInstance &&
                        Boolean(formikExpense.errors.repeatInstance)
                      : formikRevenue.touched.repeatInstance &&
                        Boolean(formikRevenue.errors.repeatInstance)
                  }
                  helperText={
                    modalType
                      ? formikExpense.touched.repeatInstance &&
                        formikExpense.errors.repeatInstance
                      : formikRevenue.touched.repeatInstance &&
                        formikRevenue.errors.repeatInstance
                  }
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={modalType ? expenseTypes : revenueTypes}
                  sx={{ width: "100%" }}
                  value={modalType ? expenseType : revenueType}
                  onChange={(event: any, newValue: any) => {
                    modalType
                      ? setExpenseType(newValue)
                      : setRevenueType(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={modalType ? "Expense Type" : "Revenue Type"}
                      name={modalType ? "expenseType" : "revenueType"}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  id="bankName"
                  name="bankName"
                  label="Bank"
                  value={
                    modalType
                      ? formikExpense.values.bankName
                      : formikRevenue.values.bankName
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                />
                <TextField
                  fullWidth
                  id="transactionId"
                  name="transactionId"
                  label="Transaction ID"
                  value={
                    modalType
                      ? formikExpense.values.transactionId
                      : formikRevenue.values.transactionId
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  // error={
                  //   modalType
                  //     ? formikExpense.touched.transactionId &&
                  //       Boolean(formikExpense.errors.transactionId)
                  //     : formikRevenue.touched.transactionId &&
                  //       Boolean(formikRevenue.errors.transactionId)
                  // }
                  // helperText={
                  //   modalType
                  //     ? formikExpense.touched.transactionId &&
                  //       formikExpense.errors.transactionId
                  //     : formikRevenue.touched.transactionId &&
                  //       formikRevenue.errors.transactionId
                  // }
                />
                <TextField
                  fullWidth
                  id={modalType ? "debitChequeNo" : "creditChequeNo"}
                  name={modalType ? "debitChequeNo" : "creditChequeNo"}
                  label={
                    modalType ? "Debit Cheque Number" : "Credit Cheque Number"
                  }
                  value={
                    modalType
                      ? formikExpense.values.debitChequeNo
                      : formikRevenue.values.creditChequeNo
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  // error={
                  //   modalType
                  //     ? formikExpense.touched.debitChequeNo &&
                  //       Boolean(formikExpense.errors.debitChequeNo)
                  //     : formikRevenue.touched.creditChequeNo &&
                  //       Boolean(formikRevenue.errors.creditChequeNo)
                  // }
                  // helperText={
                  //   modalType
                  //     ? formikExpense.touched.debitChequeNo &&
                  //       formikExpense.errors.debitChequeNo
                  //     : formikRevenue.touched.creditChequeNo &&
                  //       formikRevenue.errors.creditChequeNo
                  // }
                />
                <TextField
                  fullWidth
                  id="transactionDescription"
                  name="transactionDescription"
                  label="Transaction Description"
                  value={
                    modalType
                      ? formikExpense.values.transactionDescription
                      : formikRevenue.values.transactionDescription
                  }
                  onChange={
                    modalType
                      ? formikExpense.handleChange
                      : formikRevenue.handleChange
                  }
                  // error={
                  //   modalType
                  //     ? formikExpense.touched.transactionDescription &&
                  //       Boolean(formikExpense.errors.transactionDescription)
                  //     : formikRevenue.touched.transactionDescription &&
                  //       Boolean(formikRevenue.errors.transactionDescription)
                  // }
                  // helperText={
                  //   modalType
                  //     ? formikExpense.touched.transactionDescription &&
                  //       formikExpense.errors.transactionDescription
                  //     : formikRevenue.touched.transactionDescription &&
                  //       formikRevenue.errors.transactionDescription
                  // }
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  onClick={() => {
                    setClicked("Submit");
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  onClick={() => {
                    setClicked("SubmitAndAddNew");
                  }}
                >
                  Submit & Create New
                </Button>
              </Stack>
            </form>
          </div>
        </DialogContent>
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
          {modalType ? "Expense" : "Revenue"} Added Successfully
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
