import { ACCESS_TOKEN_LOCAL_STORAGE } from "../constants/common";
import { getApi } from "./axios.service";

export const handleSignInWithGoogleClick = async () => {
  const response = await getApi("/auth/google");
  window.location.href = response.url;
};

export const postLogin = (result: any) => {
  localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, result.data.access_token);
  
};
