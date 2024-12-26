import React from "react";

import { getApi, postApi } from "../services/axios.service";
import useAuth from "../hooks/useAuth";

const GoogleLogin = () => {
  const { user } = useAuth();

  const handleClick = async () => {
    const response = await getApi("/users/google");
    window.location.href = response.url;
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default GoogleLogin;
