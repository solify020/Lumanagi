import React from "react";
import { Navigate, Route } from "react-router";
import { ACCESS_TOKEN_LOCAL_STORAGE } from "../../constants/common";

const PublicRoutes = (props: any) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
  return isAuthenticated ? <Navigate to="/profile" /> : { ...props.children };
};

export default PublicRoutes;
