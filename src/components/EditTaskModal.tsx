import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import LinkIcon from "@mui/icons-material/Link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Container, TextField } from "@mui/material";
import Link from "@mui/material/Link";
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
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Multiselect from "multiselect-react-dropdown";
import AvatarGroup from "@mui/material/AvatarGroup";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import axios from "axios";
import "../css/EditTask.css";
import { Fullscreen } from "@mui/icons-material";

type Props = {
  name: string;
  modalType: boolean;
};

const style = {
  position: "relative",
  margin: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  // transform: "translate(-50%, -50%)",
  top: "2%",
  bgcolor: "#f4f5f7",
  border: "3px solid black",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
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

export default function EditTaskModal({ name, modalType }: Props) {
  // attachments
  const AttachmentResults = () => (
    <div id="links" className="search-results">
      <ListItemButton sx={{ pl: 4 }}>
        <ListItem>
          <Link href="#" underline="none">
            Attachment 1
          </Link>
        </ListItem>{" "}
      </ListItemButton>
      {/* second link */}
      <ListItemButton sx={{ pl: 4 }}>
        <ListItem>
          <Link href="#" underline="none">
            Attachment 2
          </Link>
        </ListItem>{" "}
        {/* second link */}
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItem>
          <Link href="#" underline="none">
            Attachment 3
          </Link>
        </ListItem>{" "}
        {/* second link */}
      </ListItemButton>
    </div>
  );

  // list of links
  const LinkResults = () => (
    <div id="links" className="search-results">
      <ListItemButton sx={{ pl: 4 }}>
        {/* <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon> */}
        <ListItem>
          <Link href="#" underline="none">
            Link 1
          </Link>
        </ListItem>{" "}
      </ListItemButton>
      {/* second link */}
      <ListItemButton sx={{ pl: 4 }}>
        <ListItem>
          <Link href="#" underline="none">
            Link 1
          </Link>
        </ListItem>{" "}
        {/* second link */}
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItem>
          <Link href="#" underline="none">
            Link 1
          </Link>
        </ListItem>{" "}
        {/* second link */}
      </ListItemButton>
    </div>
  );

  // members list
  const Results = () => (
    <div id="results" className="search-results">
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "",
        }}
      >
        {/* <Typography
                              sx={{ paddingLeft: "10px", color: "blue" }}
                            >
                              Members
                            </Typography> */}
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
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Mayur Suhasiya" src="/static/images/avatar/1.jpg" />
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
                {"Developer"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Indradeep" src="/static/images/avatar/2.jpg" />
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
                {" Manager"}
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
                {"Backend Developer"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );

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
  const [showMembers, setShowMembers] = React.useState(false);
  const [showLinks, setShowLinks] = React.useState(false);

  const viewMembers = () => setShowMembers(!showMembers);
  const viewLinks = () => setShowLinks(!showLinks);

  // open and close of modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sdValue, setSdValue] = React.useState(new Date());
  const [edValue, setEdValue] = React.useState(new Date());
  const [permission, setPermission] = React.useState(false);
  // validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
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
    taskStatus: Yup.string(),
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
      title: name,
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

  //   for right part items
  const [open, setOpen] = React.useState(false);
  const [openLinks, setOpenLinks] = React.useState(false);
  const [openMembers, setOpenMembers] = React.useState(false);
  const [openAttachments, setOpenAttachments] = React.useState(false);

  const handleLinks = () => {
    setOpenLinks(!openLinks);
  };

  const handleMembers = () => {
    setOpenMembers(!openMembers);
  };

  const handleAttachments = () => {
    setOpenAttachments(!openAttachments);
  };

  return (
    <>
      <Container maxWidth="xl">
        {/* task list buttons */}
        <Button
          fullWidth
          variant="text"
          style={{ justifyContent: "flex-start", textTransform: "none" }}
          component="label"
          onClick={handleOpen}
          sx={{
            fontSize: "12px",
            backgroundColor: "white",
            color: "black",
            width: "240px",
            marginBottom: "10px",

            ":hover": {
              bgcolor: "#DFDFDF", // theme.palette.primary.main
              color: "black",
            },
          }}
        >
          {name}
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflow: "scroll" }}
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={handleClose}
                style={{ backgroundColor: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "",
                padding: "10px",
                paddingLeft: "0px",
              }}
            >
              <Grid>
                <TextField
                  name="taskStatus"
                  onChange={handleChange}
                  type="text"
                  value={values.taskStatus}
                  label="Status"
                  variant="filled"
                  autoComplete="off"
                  onBlur={handleBlur}
                  className={
                    errors.taskStatus && touched.taskStatus ? "input-error" : ""
                  }
                  select
                  error={touched.taskStatus && Boolean(errors.taskStatus)}
                  helperText={touched.taskStatus && errors.taskStatus}
                >
                  <MenuItem value="To do">To do</MenuItem>
                  <MenuItem value="Doing">Doing</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </TextField>
              </Grid>
              {/* task status */}

              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                <h3
                  style={{
                    textAlign: "center",
                    margin: "5px",
                    color: "black",
                    fontSize: "35px",
                    backgroundColor: "",
                    marginBottom: "10px",
                  }}
                >
                  Edit Task
                </h3>
              </Typography> */}

              <Grid container spacing={2} columns={{ xs: 6, sm: 12 }}>
                <Grid item xs={8}>
                  <Stack spacing={3}>
                    <Grid container spacing={4} style={{ marginTop: "0px" }}>
                      <Grid item xs={9} columns={{ xs: 6, sm: 12 }}>
                        {/* title */}
                        {/* <SubtitlesIcon /> */}
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SubtitlesIcon />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ margin: 1 }}
                          fullWidth
                          id="title"
                          name="title"
                          label="Title"
                          variant="filled"
                          value={values.title}
                          onChange={handleChange}
                          error={touched.title && Boolean(errors.title)}
                          helperText={touched.title && errors.title}
                        />
                        {/* permission */}
                        {permission ? (
                          <Alert
                            icon={<EditIcon fontSize="inherit" />}
                            severity="success"
                            sx={{
                              width: "150px",
                              backgroundColor: "transparent",
                            }}
                          >
                            Edit / Modify
                          </Alert>
                        ) : (
                          <Alert
                            icon={<VisibilityIcon fontSize="inherit" />}
                            severity="success"
                            sx={{
                              width: "150px",
                              backgroundColor: "transparent",
                            }}
                          >
                            Following
                          </Alert>
                        )}

                        <br />
                        {/* members */}

                        <Typography
                          sx={{ paddingLeft: "10px", color: "black" }}
                        >
                          Members
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <AvatarGroup total={5}>
                            <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Indradeep Nannepeneni")}
                            />
                            <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Jed Watson")}
                            />
                            <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Tim Neutkens")}
                            />
                            <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Jed Watson")}
                            />
                            <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Tim Neutkens")}
                            />
                            <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Jed Watson")}
                            />
                            {/* <Avatar
                              src="/static/images/avatar/1.jpg"
                              {...stringAvatar("Tim Neutkens")}
                            /> */}
                            <Avatar />
                          </AvatarGroup>
                        </Stack>
                      </Grid>
                      <Grid item xs={8} sm={6}>
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
                      <Grid item xs={8} sm={6}>
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

                      <Grid item xs={6}>
                        {/* description */}
                        <TextField
                          id="description"
                          variant="filled"
                          multiline
                          name="description"
                          label="Description"
                          minRows={4}
                          value={values.description}
                          inputProps={{
                            style: {
                              width: "370px",
                            },
                          }}
                          onChange={handleChange}
                          error={
                            touched.description && Boolean(errors.description)
                          }
                          helperText={touched.description && errors.description}
                        />
                      </Grid>

                      <Grid item>
                        {/* created by */}
                        <Alert
                          icon={<AccountCircleIcon fontSize="inherit" />}
                          severity="success"
                          sx={{
                            width: "400px",
                            backgroundColor: "transparent",
                          }}
                        >
                          Created By :
                        </Alert>{" "}
                        {/* take data of curr user */}
                        {/* updated by */}
                        <Alert
                          icon={<AccountCircleIcon fontSize="inherit" />}
                          severity="success"
                          sx={{
                            width: "400px",
                            backgroundColor: "transparent",
                          }}
                        >
                          Updated By :
                        </Alert>{" "}
                        {/* take data of curr user after post update request */}
                      </Grid>
                    </Grid>
                    <br />

                    {/* take data of curr user after post update request */}
                  </Stack>
                </Grid>

                {/* right part */}
                <Grid item xs={4}>
                  <Stack spacing={3}>
                    {/* priority and options */}
                    <Grid container spacing={4} style={{ marginTop: "10px" }}>
                      <Grid item xs={10}>
                        {/* priority */}
                        <TextField
                          name="priority"
                          onChange={handleChange}
                          type="text"
                          fullWidth
                          label="Priority"
                          variant="filled"
                          autoComplete="off"
                          onBlur={handleBlur}
                          className={
                            errors.priority && touched.priority
                              ? "input-error"
                              : ""
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
                        <br />
                        {/* right side options */}
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader
                              component="div"
                              id="nested-list-subheader"
                            ></ListSubheader>
                          }
                        >
                          {/* members */}
                          <ListItemButton
                            onClick={handleMembers}
                            style={{ backgroundColor: "#dddee2" }}
                          >
                            <ListItemIcon>
                              <PersonIcon style={{ color: "black" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Members"
                              style={{ color: "black" }}
                            />
                            {/* {openMembers ? <ExpandLess /> : <ExpandMore />} */}
                          </ListItemButton>

                          {/* <Collapse
                            in={openMembers}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <Results />
                            </List>
                          </Collapse> */}

                          {/* links */}
                          <ListItemButton
                            onClick={handleLinks}
                            style={{ backgroundColor: "#dddee2" }}
                          >
                            <ListItemIcon>
                              <LinkIcon style={{ color: "black" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Links"
                              style={{ color: "black" }}
                            />
                            {/* {openLinks ? <ExpandLess /> : <ExpandMore />} */}
                          </ListItemButton>

                          {/* <Collapse in={openLinks} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <LinkResults />
                            </List>
                          </Collapse> */}

                          {/* Attachments */}
                          <ListItemButton
                            onClick={handleAttachments}
                            style={{ backgroundColor: "#dddee2" }}
                          >
                            <ListItemIcon>
                              <InsertDriveFileIcon style={{ color: "black" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Attachments"
                              style={{ color: "black" }}
                            />
                            {/* {openAttachments ? <ExpandLess /> : <ExpandMore />} */}
                          </ListItemButton>

                          {/* <Collapse
                            in={openAttachments}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <AttachmentResults />
                            </List>
                          </Collapse> */}

                          <ListItemButton
                            style={{ backgroundColor: "#dddee2" }}
                          >
                            <ListItemIcon>
                              <CheckBoxIcon style={{ color: "black" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="Checklist"
                              style={{ color: "black" }}
                            />
                          </ListItemButton>
                        </List>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                    {/* Checklist */}
                  </Stack>
                </Grid>
              </Grid>

              {/* task id */}
              {/* https://connect.technoidentity.com/task/407331000002678395 */}

              <Grid
                style={{
                  width: "50px",
                  marginLeft: "45%",
                }}
              >
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
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
