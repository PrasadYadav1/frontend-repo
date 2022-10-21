export default function authHeader() {
  const user = JSON.parse(window.localStorage.getItem("isLoggedIn") || "");
  const accessToken = JSON.parse(window.localStorage.getItem("token") || "");

  //   if user token is
  if (user && accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
