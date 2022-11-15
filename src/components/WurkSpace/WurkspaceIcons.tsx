import { WurkspaceIconsData } from "./WurkspaceIconsData";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function WurkspaceIcons() {
  return (
    <div>
      <Grid  sx={{display:"flex",justifyContent: "space-evenly"}}>
        {WurkspaceIconsData.map((data,index) => (
            <Link to={data.path} key={index} style={{textDecoration:"none"}}>
         <Grid >
          <Card
            sx={{
              cursor: "pointer",
              width: 80,
              height:80,
              borderRadius: 5,
              backgroundColor: "#f5f5f0",
            }}
          >
            <CardContent>
              <Typography sx={{ height: 20 }}>{data.icons} </Typography>
              
              <Typography
                sx={{ fontSize: 12,textDecoration:"none"}}
                color="text.secondary"
                fontWeight="bold"
                textAlign="center"
                marginTop="18px"
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

export default WurkspaceIcons;

