import React, { useState, useEffect, useContext } from "react";
import { ACCESS_TOKEN_LOCAL_STORAGE } from "../constants/common";
import { getApi } from "../services/axios.service";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  // Simulate a login action
  const login = (data: any) => {
    // Perform login logic, set user data
    const { access_token = "", ...rest } = data;
    setUser({ ...rest });
    console.log("Logged in ::::", data);
    if (access_token) {
      setIsAuthenticated(true);
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, data.access_token);
    }
  };

  // Simulate a logout action
  const logout = () => {
    // Perform logout logic, clear user data
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
    setIsAuthenticated(false);
  };

  const updateUserInfo = async () => {
    const result = await getApi("/users/me");
    setIsAuthenticated(true);
    setUser(result.data);
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);
    if (token && !user) {
      (async () => {
        try {
          updateUserInfo();
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [user]);

  return { user, login, logout, isAuthenticated, updateUserInfo };
};

export default useAuth;
