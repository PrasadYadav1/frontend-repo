
import React from "react";
import {Grid, Card, CardContent, Typography } from "@mui/material";
import { FinanceIconsData } from "./FinanceIconsData";
import { Link } from "react-router-dom";
export default function FinanceIcons() {
  return (
    <div>
      {/* <Stack direction="row" spacing={2}> */}
      <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {FinanceIconsData.map((data, index) => (
          <Link to={data.path} key={index}>
            <Grid >
              <Card
                sx={{
                  cursor: "pointer",
                  width: 90,
                  height: 80,
                  borderRadius: 8,
                  backgroundColor: "#f5f5f0",
                }}
              >
                <CardContent>
                  <Typography sx={{ height: 20 }}>{data.icon}</Typography>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    fontWeight="bold"
                    textAlign="center"
                    marginTop="13px"
                    gutterBottom
                  >
                    {data.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Link>
        ))}
      </Grid>
     
    </div>
  );
}

