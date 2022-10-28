import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { revenueTypes } from "./componentsData/revenueTypes";
import { expenseTypes } from "./componentsData/expenseType";

export default function SearchDropdown() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={expenseTypes}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Expense Type" name="expenseType" />
      )}
    />
  );
}
