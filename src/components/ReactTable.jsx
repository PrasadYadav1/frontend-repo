import React from "react";
import GridTable from "@nadavshaar/react-grid-table";

const ReactTable = ({ rows, columns }) => (
  <GridTable
    columns={columns}
    rows={rows}
    pageSizes={[5, 10, 15]}
    minSearchChars={5}
  />
);

export default ReactTable;
