import React from "react";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Footer from "./Footer";
import Header from "./Header";
import GoogleLogin from "../views/GoogleLogin";
import GoogleRedirect from "../views/GoogleRedirect";
import ResetPassword from "./auth/ResetPassword";
import PublicRoutes from "./helper/PublicRoutes.tsx";
import PrivateRoutes from "./helper/PrivateRoutes";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export function Routers() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/prediction" element={<Dashboard />} />

        <Route
          path="/reset-password"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/google/login"
          element={
            <PrivateRoutes>
              <GoogleLogin />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoutes>
              <EditProfile />
            </PrivateRoutes>
          }
        />
        <Route path="/google/redirect" element={<GoogleRedirect />} />
        <Route path="/" element={<Navigate to="/prediction" />} />
      </Route>
    </Routes>
  );
}

export default Routers;
