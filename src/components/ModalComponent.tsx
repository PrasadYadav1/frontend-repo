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

type Props = {
  name: string;
  modalType: boolean;
};

const validationSchemaExpense = Yup.object({
  transactionId: Yup.string().required("Transaction ID is required"),
  transactionDate: Yup.date().required("Required").nullable(),
  debitChequeNo: Yup.string().required("Credit Cheque Number is required"),
  transactionDescription: Yup.string().required(
    "Transaction Description is required"
  ),
  expenseType: Yup.string().required("Expense Type is required"),
  amount: Yup.number().integer().min(1).required("Amount is Required"),
  recurringExpense: Yup.string().required("Recurring Revenue is Required"),
  repeatExpenseType: Yup.string().required("Repeat Revenue Type is Required"),
  repeatInstance: Yup.number()
    .integer()
    .min(1)
    .required("Repeat Instance is Required"),
});

const style = {
  position: "absolute" as "absolute",
  top: "90%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid blue",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ name, modalType }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(new Date());

  const formik = useFormik({
    initialValues: {
      transactionId: "",
      transactionDate: "2022-10-28T10:30:40.059Z",
      debitChequeNo: "",
      transactionDescription: "",
      recipient: "",
      bankName: "",
      expenseType: "Other-Other",
      amount: 0,
      recurringExpense: "No",
      repeatExpenseType: "Annual",
      repeatInstance: 1,
    },
    validationSchema: validationSchemaExpense,
    onSubmit: async (values: any) => {
      // const selectedDate = values.transactionDate;
      // const month = selectedDate.getUTCMonth() + 1;
      // const day = selectedDate.getUTCDate();
      // const year = selectedDate.getUTCFullYear();
      // values.transactionDate = year + "-" + month + "-" + day;
      values.amount = parseInt(values.amount);
      const amount = values.amount;
      const bankName = values.bankName;
      const debitChequeNo = values.debitChequeNo;
      const recipient = values.recipient;
      const recurringExpense = values.recurringExpense;
      const repeatExpensetype = values.repeatExpensetype;
      const repeatInstance = parseInt(values.repeatInstance);
      const transactionDate = values.transactionDate;
      const transactionDescription = values.transactionDescription;
      const transactionId = values.transactionId;
      const expenseType = values.expenseType;
      // fetch("http://103.242.116.207:9000/expense/create", {
      //   method: "PUT",
      //   mode: "cors",
      //   body: JSON.stringify(values), // body data type must match "Content-Type" header
      // });
      try {
        const result = await axios.post(
          "http://103.242.116.207:9000/expense/create",
          JSON.stringify({
            amount,
            bankName,
            debitChequeNo,
            expenseType,
            recipient,
            recurringExpense,
            repeatExpensetype,
            repeatInstance,
            transactionDate,
            transactionDescription,
            transactionId,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.warn("result", result.status);
      } catch (err) {
        console.log(err);
      }
      console.log(values);
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ overflow: "scroll" }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <h1 style={{ textAlign: "center", margin: "10px" }}>{name}</h1>
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Select a Date"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params: any) => (
                        <TextField {...params} name="transactionDate" />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    fullWidth
                    id="transactionId"
                    name="transactionId"
                    label="Transaction ID"
                    value={formik.values.transactionId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.transactionId &&
                      Boolean(formik.errors.transactionId)
                    }
                    helperText={
                      formik.touched.transactionId &&
                      formik.errors.transactionId
                    }
                  />
                  <TextField
                    fullWidth
                    id="debitChequeNo"
                    name="debitChequeNo"
                    label="Credit Cheque Number"
                    value={formik.values.debitChequeNo}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.debitChequeNo &&
                      Boolean(formik.errors.debitChequeNo)
                    }
                    helperText={
                      formik.touched.debitChequeNo &&
                      formik.errors.debitChequeNo
                    }
                  />
                  <TextField
                    fullWidth
                    id="transactionDescription"
                    name="transactionDescription"
                    label="Transaction Description"
                    value={formik.values.transactionDescription}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.transactionDescription &&
                      Boolean(formik.errors.transactionDescription)
                    }
                    helperText={
                      formik.touched.transactionDescription &&
                      formik.errors.transactionDescription
                    }
                  />
                  <TextField
                    fullWidth
                    id="recipient"
                    name="recipient"
                    label={modalType ? "Recipient" : "Payee"}
                    value={formik.values.recipient}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    fullWidth
                    id="bankName"
                    name="bankName"
                    label="Bank"
                    value={formik.values.bankName}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    label="Amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.amount && Boolean(formik.errors.amount)
                    }
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
                  <InputLabel id="demo-simple-select-label">
                    {modalType ? "Recurring Expenses" : "Recurring Revenues"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="recurringExpense"
                    value={formik.values.recurringExpense}
                    label="Recurring Revenue (Y / N)"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.recurringExpense &&
                      Boolean(formik.errors.recurringExpense)
                    }
                  >
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                  <InputLabel id="demo-simple-select-label">
                    {modalType
                      ? "Recurring Expense Type"
                      : "Repeat Revenue Type"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="repeatExpenseType"
                    value={formik.values.repeatExpenseType}
                    label="Repeat Revenue Type"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.repeatExpenseType &&
                      Boolean(formik.errors.repeatExpenseType)
                    }
                  >
                    <MenuItem value={"Month"}>Month</MenuItem>
                    <MenuItem value={"Quarter"}>Quarter</MenuItem>
                    <MenuItem value={"Annual"}>Annual</MenuItem>
                  </Select>
                  <TextField
                    fullWidth
                    id="repeatInstance"
                    name="repeatInstance"
                    label="Repeat Instance"
                    value={formik.values.repeatInstance}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.repeatInstance &&
                      Boolean(formik.errors.repeatInstance)
                    }
                    helperText={
                      formik.touched.repeatInstance &&
                      formik.errors.repeatInstance
                    }
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={modalType ? expenseTypes : revenueTypes}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={modalType ? "Expense Type" : "Revenue Type"}
                        name="expenseType"
                        value={formik.values.expenseType}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.expenseType &&
                          Boolean(formik.errors.expenseType)
                        }
                        helperText={
                          formik.touched.expenseType &&
                          formik.errors.expenseType
                        }
                      />
                    )}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
