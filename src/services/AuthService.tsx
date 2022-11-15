import axios from "../api/axios";
const LOGIN_URL = "sign-in";
const REGISTER_URL = "sign-up";

// for encryption
const bcrypt = require("bcryptjs");
// // SALT should be created ONE TIME upon sign up
const salt = bcrypt.genSaltSync(10);
const salt1 = bcrypt.genSaltSync(12);

// parsing jwt token
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// login code
const login = (email: string, password: string) => {
  // password = bcrypt.hashSync(password, salt);

  return axios
    .post(
      LOGIN_URL,
      // loginFormData,
      JSON.stringify({ email: email, password: password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data?.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", JSON.stringify(response.data.user.id));
      }

      return response.data;
    });
};

// register code
const register = (
  firstName: string,
  middleName: string,
  lastName: string,
  gender: string,
  designation: string,
  primaryMobile: string,
  alternativeMobile: string,
  email: string,
  password: string,
  confirmPassword: string,
  roleId: string,
  profileImage: string
) => {
  // password = bcrypt.hashSync(password, salt); // hash created previously created upon sign up
  // confirmPassword = bcrypt.hashSync(confirmPassword, salt1);

  return axios
    .post(
      REGISTER_URL,
      JSON.stringify({
        firstName,
        middleName,
        lastName,
        gender,
        designation,
        primaryMobile,
        alternativeMobile,
        profileImage,
        email,
        password,
        confirmPassword,
        roleId,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      // if (response) {
      //   console.log(response);
      // }

      return response.data;
    });
};

// logout
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
};

// reset password
const reset = (password: string, confirmPassword: string) => {
  return axios
    .post(
      LOGIN_URL,
      // loginFormData,
      JSON.stringify({ password: password, confirmPassword: confirmPassword }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data?.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", JSON.stringify(response.data.user.id));
      }

      return response.data;
    });
};

const getCurrentUser = () => {
  var user = {
    userId: localStorage.getItem("userId") || "",
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || "",
  };
  return user;
};

const AuthService = {
  reset,
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
