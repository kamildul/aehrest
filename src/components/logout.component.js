import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.clear();
      window.location.reload(false);
    }
  }, []);
  return (
      <Navigate to="/" />
  );
};

export default Logout;