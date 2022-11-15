
import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { FinanceIconsData } from "./componentsData/FinanceIconsData";
import { Link } from "react-router-dom";

export default function FinanceIcons() {
  return (
    <div>
      <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {FinanceIconsData.map((data, index) => (
          <Link to={data.path} key={index} style={{ textDecoration: "none" }}>
            <Grid>
              <Card
                sx={{
                  cursor: "pointer",
                  width: 120,
                  height: 120,
                  borderRadius: 10,
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

                    marginTop="40px"

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

   