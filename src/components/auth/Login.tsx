/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { ReactComponent as GoogleButton } from "../../assets/images/GoogleButton.svg";
import { postApi } from "../../services/axios.service";
import { handleSignInWithGoogleClick } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { ActionTypes, AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { updateAuthAction, toggleModal } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const [apiError, setApiError] = useState("");

  const handleRedirectToRegister = (e: any) => {
    e.preventDefault();
    toggleModal();
    updateAuthAction(ActionTypes.Register);
  };

  const handleRedirectToForgotPassword = () => {
    updateAuthAction(ActionTypes.ForgotPassword);
  };

  const onSubmit = async (data: any) => {
    try {
      setApiError("");
      const result = await postApi("/auth/login", data);
      login(result.data);
      toggleModal();
    } catch (e: any) {
      console.log("Error: ", e?.response?.data || e);
      setApiError(e?.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-solid shadow-lg w-full border-foreground-night-400 bg-custom-gradient bg-blend-hard-light rounded-xl">
      <div className="self-start text-3xl font-semibold leading-10 text-white font-poppins font-weight-600">
        Login
      </div>
      <p className="self-start text-sm leading-10 text-gray-300 font-inter">
        Don't have an account?
        <a
          href="#"
          onClick={handleRedirectToRegister}
          className="ml-1 font-semibold text-primary-900-high-emphasis"
        >
          Register here
        </a>
      </p>
      <button
        className="flex items-center justify-center w-full px-3 py-2 my-4 bg-white rounded-lg text-[#292D3F] font-inter text-sm text-base"
        onClick={handleSignInWithGoogleClick}
      >
        <GoogleButton height={18} width={18} className="mr-1" />
        Continue with Google
      </button>
      <div className="flex items-center w-full my-4">
        <hr className="flex-grow border-foreground-night-400" />
        <span className="px-2 text-center text-white opacity-30 font-inter text-sm font-medium leading-1.88744rem">
          or
        </span>
        <hr className="flex-grow border-foreground-night-400" />
      </div>
      {apiError ? (
        <p className="text-red-600 text-lg mb-4">{apiError}</p>
      ) : (
        <></>
      )}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          className="flex w-full px-3 py-2 text-white border rounded-lg focus:ring focus:ring-indigo-300 bg-foreground-night-100 border-foreground-night-400"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-red-600 text-sm ml-1">
            {errors.email.message as string}
          </p>
        )}
        <input
          className="flex w-full px-3 py-2 mt-4 text-white border rounded-lg focus:ring focus:ring-indigo-300 bg-foreground-night-100 border-foreground-night-400"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-red-600 text-sm ml-1">
            {errors.password?.message as string}
          </p>
        )}
        <button
          type="button"
          className="text-red-400 mt-1 text-sm float-right"
          onClick={handleRedirectToForgotPassword}
        >
          Forgot Password?
        </button>
        <label className="block my-4 text-base font-medium leading-8 text-gray-300 font-inter">
          <input
            type="checkbox"
            className="mr-2 border-2 border-solid rounded-lg border-foreground-night-400"
            {...register("termsAndConditions", {
              required: "You must accept the terms and conditions",
            })}
          />
          I agree to CryptoHunt's Terms and Privacy Policy
          {errors.termsAndConditions && (
            <p className="mt-1 text-red-600 text-sm ml-1">
              {errors.termsAndConditions?.message as string}
            </p>
          )}
        </label>
        <button
          className="flex items-center justify-center self-stretch rounded-lg bg-primary-900-high-emphasis py-2 px-3 hover:bg-primary-900-medium-emphasis w-full text-white text-center font-inter text-lg font-semibold leading-[2.202rem]"
          type="submit"
        >
          Continue
        </button>

        <a
          href="#"
          className="flex flex-col items-center justify-center py-2 mt-4 text-lg font-semibold text-center text-primary-900-high-emphasis font-inter"
        >
          Terms
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center py-2 mt-1 text-lg font-semibold text-center text-primary-900-high-emphasis font-inter"
        >
          Privacy Policy
        </a>
      </form>
    </div>
  );
};

export default Login;
