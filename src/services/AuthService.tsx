import axios from "../api/axios";
const LOGIN_URL = "sign-in";

// register code
// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

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
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
