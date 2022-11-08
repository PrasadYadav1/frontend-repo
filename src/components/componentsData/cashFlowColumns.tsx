export const cashFlowColumns = [
  {
    id: 1,
    field: "date",
    label: "Date",
    width: "auto",
  },
  {
    id: 2,
    field: "week",
    label: "Week",
    width: "auto",
  },
  {
    id: 3,
    field: "year",
    label: "Year",
    width: "auto",
  },
  {
    id: 4,
    field: "capital",
    label: "Capital",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="capital">
        <div>&#8377; {data.capital}</div>
      </div>
    ),
  },
  {
    id: 5,
    field: "inFlow",
    label: "Inflow",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="inFlow">
        <div>&#8377; {data.inFlow}</div>
      </div>
    ),
  },
  {
    id: 6,
    field: "outFlow",
    label: "Outflow",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="outFlow">
        <div>&#8377; {data.outFlow}</div>
      </div>
    ),
  },
  {
    id: 7,
    field: "balance",
    label: "Balance",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="balance">
        <div>&#8377; {data.balance}</div>
      </div>
    ),
  },
  {
    id: 8,
    field: "loan",
    label: "Loan",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="loan">
        <div>&#8377; {data.loan}</div>
      </div>
    ),
  },
  {
    id: 9,
    field: "funding",
    label: "Funding",
    width: "auto",
    cellRenderer: ({
      tableManager,
      value,
      data,
      column,
      colIndex,
      rowIndex,
    }: any) => (
      <div className="rgt-cell-inner rgt-text-truncate" title="funding">
        <div>&#8377; {data.funding}</div>
      </div>
    ),
  },
];
