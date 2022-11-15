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
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="amount">
        <div>&#8377; {data.amount}</div>
      </div>
    ),
  },
  {
    id: 4,
    field: "transactionId",
    label: "Transaction ID",
    width: "auto",
    visible: false,
  },
  {
    id: 5,
    field: "transactionDescription",
    label: "Transaction Description",
    width: "auto",
    visible: false,
  },
  {
    id: 6,
    field: "actions",
    label: "Actions",
    width: "auto",
    sortable: false,
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
];
