import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { urlToJson } from "../services/common.service";
import { postApi } from "../services/axios.service";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const GoogleRedirect = () => {
  const { login } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const payload = urlToJson(location.search);
        const response = await postApi("/auth/google/auth", payload);
        login(response.data);
        navigate("/");
      } catch (e: any) {
        console.log(e);
        toast.error(e?.response?.data?.message || "Something went wrong!");
        navigate("/");
      }
    })();
  }, [location.search]);

  return <div>Hello World redirect</div>;
};

export default GoogleRedirect;
