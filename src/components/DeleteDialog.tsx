import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";

type Props = {
  data: any;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertDialog({ data }: Props) {
  const dataFromApi = data;
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertErrorOpen, setAlertErrorOpen] = React.useState(false);

  const dataType = "expenseId" in data ? true : false;

  function refreshPage() {
    window.location.reload();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        dataType === true
          ? `http://103.242.116.207:9000/expense/${id}`
          : `http://103.242.116.207:9000/revenue/${id}`
      );
      if (response.status === 200) {
        setAlertOpen(true);
        setOpen(false);
        setTimeout(() => refreshPage(), 2000);
      } else {
        setAlertErrorOpen(true);
        setOpen(false);
      }
    } catch (err) {
      setAlertErrorOpen(true);
    }
  };

  return (
    <div>
      <Tooltip title="Delete">
        <button style={{ marginRight: 20 }} onClick={handleClickOpen}>
          <DeleteIcon fontSize="inherit" />
        </button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
          {`Do you want to delete ${
            dataType === true ? "Expense" : "Revenue"
          } - ${
            dataType === true ? dataFromApi.expenseId : dataFromApi.revenueId
          }?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`The ${
              dataType === true ? "Expense" : "Revenue"
            } with the Date - ${
              dataFromApi.transactionDate
            } is going to be deleted.To continue press Agree or else press Disagree.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() =>
              handleDelete(
                dataType ? dataFromApi.expenseId : dataFromApi.revenueId
              )
            }
            autoFocus
          >
            Agree
          </Button>
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
            ? "Expense Deleted Successfully"
            : "Revenue Deleted Successfully"}
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
