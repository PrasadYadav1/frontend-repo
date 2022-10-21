const AuthVerify = () => {
  // decode token
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const Logout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
  };

  const accessToken = JSON.parse(localStorage.getItem("token") || "");

  if (accessToken) {
    const decodedJwt = parseJwt(accessToken);

    if (decodedJwt.exp * 1000 < Date.now()) {
      Logout();
    } else {
      return true;
    }
  }

  return;
};

export default AuthVerify;
