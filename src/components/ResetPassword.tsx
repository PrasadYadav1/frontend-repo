import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";
import "../css/SignUp.css";
import AuthService from "../services/AuthService";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import AlertTitle from "@mui/material/AlertTitle";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import { Paper, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../css/ForgotPassword.css";

const REGISTER_URL = "/sign-up";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(5),
    [theme.breakpoints.up(600)]: {
      margin: theme.spacing(7),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);
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
    password: Yup.string()
      .required("Please Enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .label("Confirm Password")
      .required()
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  const onSubmit = async (values: any, actions: any) => {
    AuthService.reset(values.password, values.confirmPassword).then(
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
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const classes = useStyles();

  return (
    <>
      <Header />

      <Container
        maxWidth="md"
        sx={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
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
                    Password Changed Successfully
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
            <Paper className={classes.pageContent} elevation={10}>
              <Typography
                fontSize={{
                  lg: 35,
                  md: 30,
                  sm: 25,
                  xs: 20,
                }}
                // sx={{ marginBottom: "20px" }}
                sx={{
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "black",
                  textDecoration: "none",
                  align: "center",
                  fontSize: { sm: "30px" },
                  marginBottom: "30px",
                }}
                gutterBottom
              >
                Enter New Password
              </Typography>

              <Grid
                container
                spacing={2}
                columns={{ sm: 3, md: 8 }}
                justifyContent="center"
              >
                <Grid item xs={4}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password" sx={{ m: 1 }}>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password ? "input-error" : ""
                      }
                      onChange={handleChange}
                      value={values.password}
                      sx={{ m: 1 }}
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
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
                <Grid item xs={4}>
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

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  sx={{ margin: 3 }}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "50px",
                    minWidth: "30px",
                    minHeight: "30px",
                    marginLeft: "35px",
                  }}
                >
                  Save Password
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
            </Paper>
          )}
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default ResetPassword;
