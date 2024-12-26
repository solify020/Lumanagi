import React from "react";
import { Navigate, Route } from "react-router";
import { ACCESS_TOKEN_LOCAL_STORAGE } from "../../constants/common";

const PrivateRoutes = (props: any) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
  return !isAuthenticated ? <Navigate to="/login" /> : { ...props.children };
};

export default PrivateRoutes;
