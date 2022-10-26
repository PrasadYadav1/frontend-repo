import axios from "../api/axios";
const LOGIN_URL = "sign-in";
const REGISTER_URL = "sign-up";

// parsing jwt token
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
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

// login code
const login = (email: string, password: string) => {
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

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
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
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
