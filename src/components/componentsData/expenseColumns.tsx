import AlertDialog from "../DeleteDialog";
import EditDialog from "../EditDialog";

export const expenseColumns = [
  {
    id: 1,
    field: "transactionDate",
    label: "Transaction Date",
    width: "auto",
  },
  {
    id: 2,
    field: "recipient",
    label: "Recipient",
    width: "auto",
  },
  {
    id: 3,
    field: "amount",
    label: "Amount",
    width: "auto",
  },
  {
    id: 4,
    field: "actions",
    label: "Actions",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <>
        <AlertDialog data={data} />
        <EditDialog data={data} />
      </>
    ),
  },
  {
    id: 5,
    field: "transactionId",
    label: "Transaction ID",
    width: "auto",
    visible: false,
  },
  {
    id: 6,
    field: "transactionDescription",
    label: "Transaction Description",
    width: "auto",
    visible: false,
  },
];
