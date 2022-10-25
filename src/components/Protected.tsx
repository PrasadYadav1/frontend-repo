import { Navigate } from "react-router-dom";
import { useState } from "react";

const Protected = ({ children }: { children: any }) => {
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || ""
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
