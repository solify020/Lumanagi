/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { ReactComponent as GoogleButton } from "../../assets/images/GoogleButton.svg";
import { useNavigate } from "react-router";
import { postApi } from "../../services/axios.service";
import { ACCESS_TOKEN_LOCAL_STORAGE } from "../../constants/common";
import {
  handleSignInWithGoogleClick,
  postLogin,
} from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import {
  ActionTypes,
  AuthActions,
  AuthContext,
} from "../../contexts/AuthContext";

const Register = () => {
  const { toggleModal, updateAuthAction } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const [apiError, setApiError] = useState("");

  const handleRedirectToLogin = (e: any) => {
    e.preventDefault();
    toggleModal();
    updateAuthAction(ActionTypes.Login);
  };

  const onSubmit = async (data: any) => {
    try {
      setApiError("");
      const result = await postApi("/auth", data);
      login(result.data);
      toggleModal();
    } catch (e: any) {
      console.log("Error: ", e?.response?.data || e);
      setApiError(e?.response?.data?.message || "Invalid Credentials");
    }
  };

  const FORM_FIELDS = [
    {
      type: "text",
      fieldName: "firstName",
      label: "First Name",
      validation: { required: "First name is required" },
    },
    {
      type: "text",
      fieldName: "lastName",
      label: "Last Name",
      validation: { required: "Last name is required" },
    },
    {
      type: "email",
      fieldName: "email",
      label: "Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email format",
        },
      },
    },
    {
      type: "password",
      fieldName: "password",
      label: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      },
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 border-2 border-solid shadow-lg w-full border-foreground-night-400 bg-custom-gradient bg-blend-hard-light rounded-xl">
      <div className="self-start text-3xl font-semibold leading-10 text-white font-poppins font-weight-600">
        Create Your Account
      </div>
      <p className="self-start text-sm leading-10 text-gray-300 font-inter">
        Already registered?
        <a
          href="#"
          onClick={handleRedirectToLogin}
          className="ml-1 font-semibold text-primary-900-high-emphasis"
        >
          Sign in here
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
        {FORM_FIELDS.map((item, index: number) => (
          <Fragment key={`register-form-${index}`}>
            <input
              className={`flex w-full px-3 py-2 ${
                index > 0 ? "mt-4" : ""
              } text-white border rounded-lg focus:ring focus:ring-indigo-300 bg-foreground-night-100 border-foreground-night-400`}
              type={item.type}
              placeholder={item.label}
              {...register(item.fieldName, item.validation)}
            />
            {item.fieldName in errors && (
              <p className="mt-1 text-red-600 text-sm ml-1">
                {errors[item.fieldName]?.message as string}
              </p>
            )}
          </Fragment>
        ))}

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
              {errors.termsAndConditions.message as string}
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

export default Register;
