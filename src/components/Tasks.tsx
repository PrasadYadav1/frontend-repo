import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TaskModal from "./TaskModal";
import EditTaskModal from "./EditTaskModal";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";

import "../css/Tasks.css";

const todos = ["Make drawing", "Read book", "Clean your Desk"];
const doing = [
  "Random task with large title to check output",
  "Read book",
  "Clean your Desk",
];
const done = ["Created Login page", "Added authentication"];

const todoItems = todos.map((todo) => (
  <>
    {" "}
    <EditTaskModal name={todo} modalType={true} />{" "}
  </>
));

const doingItems = doing.map((doing) => (
  <>
    <EditTaskModal name={doing} modalType={true} />{" "}
  </>
));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function Tasks() {
  const doneItems = done.map((done) => (
    <>
      <EditTaskModal name={done} modalType={true} />{" "}
      {/* <a href="" style={{ justifyContent: "flex-end" }}>
        {" "}
        <EditIcon sx={{ fontSize: 15, color: "white" }} />
      </a> */}
    </>
  ));

  // const [spacing, setSpacing] = React.useState(2);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSpacing(Number((event.target as HTMLInputElement).value));
  // };

  return (
    <>
      <Container
        maxWidth={false}
        className="task-container"
        sx={{ marginTop: "50px" }}
      >
        {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} /> */}
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing="30">
              {/* <Grid item>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography
                    sx={{ fontSize: 15, color: "black" }}
                    gutterBottom
                  >
                    Doing
                  </Typography>
                </Box>
              </Grid> */}
              {/* Todo card */}

              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="card-content">
                    <Typography
                      sx={{ fontSize: 15, color: "white" }}
                      gutterBottom
                    >
                      To do
                    </Typography>

                    {todoItems}
                  </CardContent>
                  <CardActions>
                    <TaskModal name={"Add a card"} modalType={true} />
                  </CardActions>
                </Card>
              </Grid>

              {/* doing card */}
              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="card-content">
                    <Typography
                      sx={{ fontSize: 15, color: "white" }}
                      gutterBottom
                    >
                      Doing
                    </Typography>
                    {/* <TaskModal name={"Create"} modalType={true} /> */}
                    {doingItems}
                  </CardContent>
                  <CardActions>
                    <TaskModal name={"Add a card"} modalType={true} />
                  </CardActions>
                </Card>
              </Grid>

              {/* done card */}
              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="card-content">
                    <Typography
                      sx={{ fontSize: 15, color: "white" }}
                      gutterBottom
                    >
                      Done
                    </Typography>

                    {doneItems}
                    {/* <TaskModal name={"Create"} modalType={true} /> */}
                    <br />
                    {/* <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                  </Typography> */}

                    {/* <Typography variant="body2">
                    {'"a benevolent smile"'}
                  </Typography> */}
                  </CardContent>
                  <CardActions>
                    <TaskModal name={"Add a task"} modalType={true} />
                  </CardActions>
                </Card>
              </Grid>
              {/* idea board */}
              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="card-content">
                    <Typography
                      sx={{ fontSize: 15, color: "white" }}
                      gutterBottom
                    >
                      Idea board
                    </Typography>

                    {doneItems}
                    {/* <TaskModal name={"Create"} modalType={true} /> */}
                    <br />
                    {/* <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                  </Typography> */}

                    {/* <Typography variant="body2">
                    {'"a benevolent smile"'}
                  </Typography> */}
                  </CardContent>
                  <CardActions>
                    <TaskModal name={"Add a card"} modalType={true} />
                  </CardActions>
                </Card>
              </Grid>
              {/* shared card */}
              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="card-content">
                    <Typography
                      sx={{ fontSize: 15, color: "white" }}
                      gutterBottom
                    >
                      Shared
                    </Typography>

                    {doneItems}
                    {/* <TaskModal name={"Create"} modalType={true} /> */}
                    <br />
                    {/* <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                  </Typography> */}

                    {/* <Typography variant="body2">
                    {'"a benevolent smile"'}
                  </Typography> */}
                  </CardContent>
                  <CardActions>
                    <TaskModal name={"Add a card"} modalType={true} />
                  </CardActions>
                </Card>
              </Grid>
              {/* asssigned task card */}
              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="card-content">
                    <Typography
                      sx={{ fontSize: 15, color: "white" }}
                      gutterBottom
                    >
                      Assigned Tasks
                    </Typography>

                    {doneItems}
                    {/* <TaskModal name={"Create"} modalType={true} /> */}
                    <br />
                    {/* <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                  </Typography> */}

                    {/* <Typography variant="body2">
                    {'"a benevolent smile"'}
                  </Typography> */}
                  </CardContent>
                  <CardActions>
                    <TaskModal name={"Add a card"} modalType={true} />
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">spacing</FormLabel>
                  <RadioGroup
                    name="spacing"
                    aria-label="spacing"
                    value={spacing.toString()}
                    onChange={handleChange}
                    row
                  >
                    {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                      <FormControlLabel
                        key={value}
                        value={value.toString()}
                        control={<Radio />}
                        label={value.toString()}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
