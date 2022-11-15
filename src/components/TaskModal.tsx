import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { Button, Container, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import SearchDropdown from "./SearchDropdown";
import { useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { revenueTypes } from "./componentsData/revenueTypes";
import { expenseTypes } from "./componentsData/expenseType";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Multiselect from "multiselect-react-dropdown";
import AvatarGroup from "@mui/material/AvatarGroup";

import axios from "axios";
import "../css/Tasks.css";

type Props = {
  name: string;
  modalType: boolean;
};

const style = {
  position: "relative",
  margin: "auto",
  // transform: "translate(-50%, -50%)",
  top: "2%",
  width: 500,
  bgcolor: "#EBECF0",
  border: "2px solid blue",
  boxShadow: 24,
  p: 4,
};

const option = [
  {
    cat: "Group 1",
    key: "Indradeep",
  },
  {
    cat: "Group 1",
    key: "Mayur",
  },
  {
    cat: "Group 1",
    key: "Archana",
  },
  {
    cat: "Group 2",
    key: "Raksha",
  },
  {
    cat: "Group 2",
    key: "Sumit",
  },
  {
    cat: "Group 2",
    key: "Sowmiya",
  },
  {
    cat: "Group 2",
    key: "Himakar",
  },
];

// delete members button logic
const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

export default function TaskModal({ name, modalType }: Props) {
  // member icon

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // variables
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sdValue, setSdValue] = React.useState(new Date());
  const [edValue, setEdValue] = React.useState(new Date());
  const [permission, setPermission] = React.useState(false);
  // validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    priority: Yup.string().required("Required"),
    startDate: Yup.date().required("Required").nullable(),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "due date can't be before start date")
      .max(new Date())
      .required("Required")
      .nullable(),
    description: Yup.string(),
    members: Yup.string(),
    links: Yup.string(),
    taskStatus: Yup.string().required("Status is Required").nullable(),
  });

  // on submit function
  const onSubmit = async (values: any, actions: any) => {
    const title = values.amount;
    const priority = values.priority;
    const startDate = values.startDate;
    const endDate = values.endDate;
    const description = values.description;
    const checklist = values.checklist;
    const members = values.members;
    const links = values.links;
    const attatchment = values.attatchment;
    const taskStatus = values.taskStatus;
    const permission = values.permission;

    // option
    const colourOptions = [
      { value: "ocean1", label: "Ocean" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "Yellow" },
      { value: "green", label: "Green" },
      { value: "forest", label: "Forest" },
      { value: "slate", label: "Slate" },
      { value: "silver", label: "Silver" },
    ];

    // user data
    const createdBy = values.createdBy;
    // const updatedBy = values.updatedBy;

    try {
      const result = await axios.post(
        "http://103.242.116.207:9000/",
        JSON.stringify({
          title,
          priority,
          startDate,
          endDate,
          description,
          checklist,
          members,
          links,
          attatchment,
          taskStatus,
          permission,
          createdBy,
          // updatedBy,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.warn("result", result.status);
    } catch (err) {
      console.log(err);
    }
    console.log(values);
    // actions.resetForm();
  };

  // grid item box
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // values
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      priority: "Blue",
      startDate: "",
      endDate: "",
      description: "",
      checklist: "",
      members: "",
      links: "",
      attatchment: "",
      taskStatus: "",
      permission: "",
      createdBy: "",
      // updatedBy: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const dateChange = (newValue: any) => {
    // console.log(newValue);
    setSdValue(newValue);
  };

  const dateChange1 = (newValue: any) => {
    // console.log(newValue);
    setEdValue(newValue);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Button
          fullWidth
          variant="text"
          style={{ justifyContent: "flex-start", textTransform: "none" }}
          component="label"
          onClick={handleOpen}
          sx={{ backgroundColor: "" }}
        >
          <AddIcon /> {name}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflow: "scroll" }}
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit} style={{}}>
              <Stack spacing={3}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h3
                    style={{
                      textAlign: "center",
                      margin: "5px",
                      color: "black",
                    }}
                  >
                    {name}
                  </h3>
                </Typography>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                {/* priority and status */}
                <Grid container spacing={4} style={{ marginTop: "0px" }}>
                  <Grid item xs={5}>
                    {/* priority */}
                    <TextField
                      name="priority"
                      onChange={handleChange}
                      type="text"
                      sx={{ m: 1 }}
                      fullWidth
                      label="Priority"
                      variant="outlined"
                      autoComplete="off"
                      onBlur={handleBlur}
                      className={
                        errors.priority && touched.priority ? "input-error" : ""
                      }
                      select
                      defaultValue={"Low"}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Moderate">Moderate</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </TextField>
                    {errors.priority && touched.priority && (
                      <p className="error">{errors.priority}</p>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    {/* task status */}
                    <TextField
                      name="taskStatus"
                      onChange={handleChange}
                      type="text"
                      sx={{ m: 1 }}
                      value={values.taskStatus}
                      fullWidth
                      label="Status"
                      variant="outlined"
                      autoComplete="off"
                      onBlur={handleBlur}
                      className={
                        errors.taskStatus && touched.taskStatus
                          ? "input-error"
                          : ""
                      }
                      select
                      error={touched.taskStatus && Boolean(errors.taskStatus)}
                      helperText={touched.taskStatus && errors.taskStatus}
                    >
                      <MenuItem value="To do">To do</MenuItem>
                      <MenuItem value="Doing">Doing</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </TextField>
                    {/* {errors.taskStatus && touched.taskStatus && (
                      <p className="error">{errors.taskStatus}</p>
                    )} */}
                  </Grid>
                  {/* <Grid item xs={4}>
                    <Item>xs=4</Item>
                  </Grid>
                  <Grid item xs={8}>
                    <Item>xs=8</Item>
                  </Grid> */}
                </Grid>
                {/* dates */}
                <Grid
                  container
                  spacing={4}
                  style={{ marginTop: "0px", marginLeft: "8px" }}
                >
                  <Grid item xs={5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/DD/YYYY"
                        value={sdValue}
                        onChange={dateChange}
                        renderInput={(params: any) => (
                          <TextField {...params} name="startDate" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Due Date"
                        inputFormat="MM/DD/YYYY"
                        value={edValue}
                        onChange={dateChange1}
                        renderInput={(params: any) => (
                          <TextField {...params} name="endDate" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {/* <Grid item xs={4}>
                    <Item>xs=4</Item>
                  </Grid>
                  <Grid item xs={8}>
                    <Item>xs=8</Item>
                  </Grid> */}
                </Grid>
                {/* description */}
                <TextField
                  id="description"
                  multiline
                  name="description"
                  label="Description"
                  minRows={4}
                  // sx={{ backgroundColor: "white" }}
                  value={values.description}
                  inputProps={{
                    style: {},
                  }}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                {/* Checklist */}
                {/* members */}
                <Multiselect
                  className="multi-select-members"
                  displayValue="key"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={function noRefCheck() {}}
                  onSearch={function noRefCheck() {}}
                  onSelect={function noRefCheck() {}}
                  options={option}
                  style={{ color: "black", borderRadius: "5px" }}
                  placeholder="Add members"
                />

                {/* showing alredy added members */}
                {/* <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "",
                  }}
                >
                  <Typography sx={{ paddingLeft: "10px", color: "blue" }}>
                    Members
                  </Typography>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Mayur Suhasiya"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Mayur Suhasiya"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {" some text"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Indradeep"
                        src="/static/images/avatar/2.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Indradeep Nannepeneni"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {" I'm out of town this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="A" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Archana Khamankar"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {" — Do you have Paris recommendations? "}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List> */}
                {/* links */}
                <TextField
                  fullWidth
                  id="links"
                  name="links"
                  label="Add Links"
                  // sx={{ backgroundColor: "white" }}
                  minRows={3}
                  value={values.links}
                  onChange={handleChange}
                  error={touched.links && Boolean(errors.links)}
                  helperText={touched.links && errors.links}
                />
                {/* attatchment */}
                <Typography sx={{ paddingLeft: "10px", color: "blue" }}>
                  Attatchments
                </Typography>
                <input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept="application/pdf, image/png"
                />
                {/* permission */}
                {permission ? (
                  <Alert
                    icon={<EditIcon fontSize="inherit" />}
                    severity="success"
                  >
                    Edit / Modify
                  </Alert>
                ) : (
                  <Alert
                    icon={<VisibilityIcon fontSize="inherit" />}
                    severity="success"
                    sx={{ width: "150px" }}
                  >
                    Following
                  </Alert>
                )}
                {/* created by */}
                {/* take data of curr user */}
                {/* updated by */}
                {/* take data of curr user after post update request */}
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>

        {/* <Button
        fullWidth
        variant="text"
        style={{ justifyContent: "flex-start" }}
        component="label"
        onClick={handleOpen}
      >
        <AddIcon /> {name}
      </Button> */}
        {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ overflow: "scroll" }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <h1 style={{ textAlign: "center", margin: "5px" }}>{name}</h1>
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/DD/YYYY"
                      value={sdValue}
                      onChange={handleChange}
                      renderInput={(params: any) => (
                        <TextField {...params} name="startDate" />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="MM/DD/YYYY"
                      value={edValue}
                      onChange={handleChange1}
                      renderInput={(params: any) => (
                        <TextField {...params} name="endDate" />
                      )}
                    />
                  </LocalizationProvider>

                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    minRows={3}
                    maxRows={10}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal> */}
      </Container>
    </>
  );
}
