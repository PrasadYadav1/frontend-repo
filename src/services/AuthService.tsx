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
      }

      return response.data;
    });
};

// const login = (email, password) => {
//   return axios
//     .post(LOGIN_URL, {
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
};

const getCurrentUser = () => {
  var user = {
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
