import { Grid, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

function LeaveManagement() {
  return (
    <>
      <Grid>
        <Stack direction="row" alignItems="center" spacing={4} mt={2}>
          <Paper
            elevation={10}
            square={false}
            sx={{
              m: 2,
              p: 2,
              bgcolor: "beige",
              alignItems: "center",
              display: "flex",
            }}
          >
            <AccountCircleIcon />
            <Typography sx={{ p: 1 }}>Attendence</Typography>
          </Paper>
          <Stack direction="column" alignItems="center" spacing={4} mt={2}>
            <Button variant="outlined">Check-IN</Button>
            <Button variant="outlined">Check-OUT</Button>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
}

export default LeaveManagement;
