import AlertDialog from "../DeleteDialog";
import EditDialog from "../EditDialog";

export const revenueColumns = [
  {
    id: 1,
    field: "transactionDate",
    label: "Transaction Date",
    width: "auto",
  },
  {
    id: 2,
    field: "payer",
    label: "Payer",
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
