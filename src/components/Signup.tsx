import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";
import axios from "../api/axios";
import "../css/SignUp.css";
import AuthService from "../services/AuthService";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import AlertTitle from "@mui/material/AlertTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Paper, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { height } from "@mui/system";

const REGISTER_URL = "/sign-up";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600)]: {
      margin: theme.spacing(5),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SignUp = () => {
  const [errMsg, setErrMsg] = useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [profileImage, setProfileImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setshowconfirmPassword(!showconfirmPassword);

  const handleMouseDownConfirmPassword = () =>
    setshowconfirmPassword(!showconfirmPassword);
  const [success, setSuccess] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email.").required("Required"),
    primaryMobile: Yup.string()
      .required("Required")
      .matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
    alternativeMobile: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
    gender: Yup.string().required("Required"),
    designation: Yup.string().required("Required"),
    roleId: Yup.number().required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 10 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .label("Password Confirm")
      .required()
      .oneOf([Yup.ref("password"), null], "Confirm Passwords does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Required"),
  });

  const onSubmit = async (values: any, actions: any) => {
    AuthService.register(
      values.firstName,
      values.middleName,
      values.lastName,
      values.gender,
      values.designation,
      values.primaryMobile,
      values.alternativeMobile,
      values.email,
      values.password,
      values.confirmPassword,
      values.roleId,
      profileImage
    ).then(
      () => {
        setSuccess(true);
      },
      (err) => {
        console.log(err);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Invalid Email or password");
        } else {
          setErrMsg("Login Failed");
        }
      }
    );
    actions.resetForm();
  };
  // };

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
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      designation: "",
      primaryMobile: "",
      alternativeMobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleId: "",
      profileImage: "",
      acceptTerms: false,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const classes = useStyles();
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Box
          component="form"
          autoComplete="off"
          sx={{
            margin: 3,
          }}
          onSubmit={handleSubmit}
        >
          {success ? (
            <Box
              sx={{
                height: 600,
                flexGrow: 1,
                minWidth: 300,
                transform: "translateZ(0)",
                "@media all and (-ms-high-contrast: none)": {
                  display: "none",
                },
              }}
              ref={rootRef}
            >
              <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                sx={{
                  display: "flex",
                  p: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                container={() => rootRef.current}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: (theme) => theme.shadows[5],
                    p: 4,
                  }}
                >
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You are successfully registerd
                    <strong>
                      <Button
                        href="/login"
                        sx={{ marginLeft: "70px", mt: 2, mb: 2 }}
                        variant="contained"
                      >
                        Login
                      </Button>
                    </strong>
                  </Alert>
                </Box>
              </Modal>
            </Box>
          ) : (
            <Paper className={classes.pageContent} elevation={13}>
              <Typography
                fontSize={{
                  lg: 50,
                  md: 40,
                  sm: 30,
                  xs: 25,
                }}
                gutterBottom
              >
                SIGN UP
              </Typography>
              <Grid container spacing={3} columns={{ xs: 4, sm: 12 }}>
                <Grid item xs={4}>
                  <TextField
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    type="text"
                    sx={{ margin: 1 }}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    label="First Name"
                    onBlur={handleBlur}
                    className={
                      errors.firstName && touched.firstName ? "input-error" : ""
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="middleName"
                    type="text"
                    onChange={handleChange}
                    value={values.middleName}
                    sx={{ margin: 1 }}
                    fullWidth
                    label="Middle Name"
                    variant="outlined"
                    autoComplete="off"
                    onBlur={handleBlur}
                    className={
                      errors.middleName && touched.middleName
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.middleName && touched.middleName && (
                    <p className="error">{errors.middleName}</p>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    value={values.lastName}
                    sx={{ margin: 1 }}
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    autoComplete="off"
                    onBlur={handleBlur}
                    className={
                      errors.lastName && touched.lastName ? "input-error" : ""
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    sx={{ margin: 1 }}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input-error" : ""
                    }
                  />
                  <div>
                    {" "}
                    {errors.email && touched.email && (
                      <p className="error">{errors.email}</p>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="primaryMobile"
                    type="text"
                    onChange={handleChange}
                    value={values.primaryMobile}
                    sx={{ margin: 1 }}
                    fullWidth
                    label="Mobile Number"
                    variant="outlined"
                    autoComplete="off"
                    onBlur={handleBlur}
                    className={
                      errors.primaryMobile && touched.primaryMobile
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.primaryMobile && touched.primaryMobile && (
                    <p className="error">{errors.primaryMobile}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="alternativeMobile"
                    type="text"
                    onChange={handleChange}
                    value={values.alternativeMobile}
                    sx={{ margin: 1 }}
                    fullWidth
                    label="Alternative Mobile Number"
                    variant="outlined"
                    autoComplete="off"
                    onBlur={handleBlur}
                    className={
                      errors.alternativeMobile && touched.alternativeMobile
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.alternativeMobile && touched.alternativeMobile && (
                    <p className="error">{errors.alternativeMobile}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel
                      id="gender"
                      sx={{ color: "text.primary", margin: 1, fontSize: 22 }}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      name="gender"
                      onChange={handleChange}
                      value={values.gender}
                      onBlur={handleBlur}
                      className={
                        errors.gender && touched.gender ? "input-error" : ""
                      }
                      sx={{ mt: 1, ml: 2, color: "text.primary" }}
                    >
                      <FormControlLabel
                        value="Female"
                        control={
                          <Radio
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={
                          <Radio
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="Male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={
                          <Radio
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {errors.gender && touched.gender && (
                  <p className="error">{errors.gender}</p>
                )}
                <Grid
                  container
                  spacing={3}
                  columns={{ xs: 6, sm: 12 }}
                  sx={{ mt: 1, ml: 0 }}
                >
                  <Grid item xs={6}>
                    <TextField
                      name="roleId"
                      onChange={handleChange}
                      value={values.roleId}
                      type="number"
                      sx={{ m: 1 }}
                      fullWidth
                      label="Role ID"
                      variant="outlined"
                      autoComplete="off"
                      onBlur={handleBlur}
                      className={
                        errors.roleId && touched.roleId ? "input-error" : ""
                      }
                      select
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </TextField>
                    {errors.roleId && touched.roleId && (
                      <p className="error">{errors.roleId}</p>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="designation"
                      id="designation"
                      sx={{ m: 1 }}
                      fullWidth
                      label="Designation"
                      onChange={handleChange}
                      value={values.designation}
                      onBlur={handleBlur}
                      className={
                        errors.designation && touched.designation
                          ? "input-error"
                          : ""
                      }
                      select
                    >
                      <MenuItem value="developer">Developer</MenuItem>
                      <MenuItem value="uideveloper">UI Developer</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                    </TextField>
                    {errors.designation && touched.designation && (
                      <p className="error">{errors.designation}</p>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  columns={{ xs: 6, sm: 12 }}
                  sx={{ mt: 1, ml: 0 }}
                >
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="password" sx={{ m: 1 }}>
                        Password
                      </InputLabel>
                      <OutlinedInput
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password
                            ? "input-error"
                            : ""
                        }
                        onChange={handleChange}
                        value={values.password}
                        sx={{ m: 1 }}
                        fullWidth
                        autoComplete="off"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    {errors.password && touched.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="confirmPassword" sx={{ m: 1 }}>
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        name="confirmPassword"
                        type={showconfirmPassword ? "text" : "password"}
                        onChange={handleChange}
                        value={values.confirmPassword}
                        sx={{ m: 1 }}
                        fullWidth
                        onBlur={handleBlur}
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? "input-error"
                            : ""
                        }
                        autoComplete="off"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                            >
                              {showconfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="confirmPassword"
                      />
                    </FormControl>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox />}
                      name="acceptTerms"
                      className={
                        errors.acceptTerms && touched.acceptTerms
                          ? "input-error"
                          : ""
                      }
                      onChange={handleChange}
                      sx={{ margin: 2 }}
                      value={values.acceptTerms}
                      label="  I agree to the Terms and Conditions"
                    />
                  </Grid>
                </Grid>
                {errors.acceptTerms && touched.acceptTerms && (
                  <p className="error">{errors.acceptTerms}</p>
                )}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ margin: 3, maxWidth: "lg" }}
                  fullWidth
                >
                  CREATE ACCOUNT
                </Button>
                {errMsg == "" ? (
                  ""
                ) : (
                  <Alert severity="error" sx={{ width: "100%" }}>
                    <AlertTitle>Error</AlertTitle>
                    {errMsg}
                  </Alert>
                )}
              </Grid>
              <div className="link">
                <Link to="/login">Already have an account? </Link>
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </div>
            </Paper>
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default SignUp;
