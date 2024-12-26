/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../../services/axios.service";
import { toast } from "react-toastify";
import {
  ActionTypes,
  AuthActions,
  AuthContext,
} from "../../contexts/AuthContext";

const ForgotPassword = () => {
  const { toggleModal, updateAuthAction } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState("");

  const handleRedirectToLogin = (e: any) => {
    e.preventDefault();
    toggleModal();
    updateAuthAction(ActionTypes.Login);
  };

  const onSubmit = async (data: any) => {
    try {
      setApiError("");
      const result = await postApi("/users/forgot-password", data);
      toast.success(
        result.message || "Link has been sent to this email address"
      );
      toggleModal();
    } catch (e: any) {
      console.log("Error: ", e?.response?.data || e);
      setApiError(e?.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-solid shadow-lg w-full border-foreground-night-400 bg-custom-gradient bg-blend-hard-light rounded-xl">
      <div className="self-start text-3xl font-semibold leading-10 text-white font-poppins font-weight-600">
        Reset password
      </div>
      <p className="self-start mt-2 mb-4 text-sm leading-5 text-gray-300 font-inter">
        Enter your email and we'll send you instructions on how to reset your
        password.
      </p>

      {apiError ? (
        <p className="mb-4 text-lg text-red-600">{apiError}</p>
      ) : (
        <></>
      )}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          className="flex w-full px-3 py-2 text-white border rounded-lg focus:ring focus:ring-indigo-300 bg-foreground-night-100 border-foreground-night-400"
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.email.message as string}
          </p>
        )}
        <button
          className="flex items-center mt-4 justify-center self-stretch rounded-lg bg-primary-900-high-emphasis py-2 px-3 hover:bg-primary-900-medium-emphasis w-full text-white text-center font-inter text-lg font-semibold leading-[2.202rem]"
          type="submit"
        >
          Send
        </button>
      </form>
      <p className="mt-2 text-sm leading-10 text-gray-300 font-inter">
        Back to
        <a
          href="#"
          className="ml-1 font-semibold text-primary-900-high-emphasis"
          onClick={handleRedirectToLogin}
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;
