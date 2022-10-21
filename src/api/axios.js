import axios from "axios";
const BASE_URL = "http://103.242.116.207:9000/api/auth/";

export default axios.create({
  baseURL: BASE_URL,
});

// import axios from "axios";

// const customRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Request-Origin": "website" },
// });

// customRequest.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("token");

//   //checking if accessToken exists
//   if (accessToken) {
//     config.headers["Authorization"] = accessToken;
//   }
//   return config;
// });

// customRequest.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     //extracting response and config objects
//     const { response, config } = error;
//     //checking if error is Aunothorized error
//     if (response.status === 401) {
//       let refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         //if refresh token exists in local storage proceed
//         try {
//           //try refreshing token
//           const data = await customRequest.post("/refresh/", {
//             refresh: refreshToken,
//           });
//           let accessToken = data.data.accessToken;
//           if (accessToken) {
//             //if request is successiful and token exists in response data
//             //store it in local storage
//             localStorage.setItem("accessToken", accessToken);
//             //with new token retry original request
//             config.headers["Authorization"] = accessToken;
//             return customRequest(config);
//           }
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     }
//     //clear local storage and log user out
//     logout();
//     return error;
//   }
// );

// // const logout = () => {
// //   //handle logout
// //   localStorage.removeItem("accessToken");
// //   localStorage.removeItem("refreshToken");
// // };

// const handleLogin = (email, password) => {
//   customRequest
//     .post("/login", { email: email, password: password })
//     .then((response) => {
//       const token = response.data.token;
//       const refreshToken = response.data.refreshToken;
//       localStorage.setItem("accessToken", token);
//       localStorage.setItem("refreshToken", refreshToken);
//       const user = response.data.user;
//       //handle user
//     })
//     .catch((e) => console.log(e));
// };

// export { customRequest };
