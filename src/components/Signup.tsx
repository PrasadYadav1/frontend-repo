import React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Signup = () => {
  return (
    <div>
      <h1>
        <Checkbox {...label} defaultChecked />
        <Checkbox {...label} />
      </h1>
    </div>
  );
};

export default Signup;
