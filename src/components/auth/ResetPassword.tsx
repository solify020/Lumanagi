/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { urlToJson } from "../../services/common.service";
import { putApi } from "../../services/axios.service";
import { toast } from "react-toastify";
import CustomModal from "../../UI/CustomModal";
import {
  AuthContext,
  ActionTypes,
  AuthActions,
} from "../../contexts/AuthContext";

type FormProps = {
  token: string;
  closeModal: any;
};

const Form = ({ token, closeModal }: FormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { toggleModal, updateAuthAction } = useContext(AuthContext);

  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: any) => {
    try {
      setApiError("");
      const result = await putApi(`/users/reset-password/${token}`, data);
      toast.success(result.message || "Done");
      closeModal();
      navigate("/");
    } catch (e: any) {
      console.log("Error: ", e?.response?.data || e);
      toast.error(e?.response?.data?.message || "Invalid or expired token!");
    }
  };

  const FORM_FIELDS = [
    {
      type: "password",
      fieldName: "newPassword",
      label: "New Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      },
    },
    {
      type: "password",
      fieldName: "confirmPassword",
      label: "Confirm Password",
      validation: {
        required: "Confirm password is required",
        validate: (value: string) =>
          value === getValues("newPassword") || "Passwords do not match",
      },
    },
  ];

  const handleRedirectToLogin = (e: any) => {
    e.preventDefault();
    closeModal();
    navigate('/');
    updateAuthAction(ActionTypes.Login);
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-solid shadow-lg w-full border-foreground-night-400 bg-custom-gradient bg-blend-hard-light rounded-xl">
      <div className="self-start text-3xl font-semibold leading-10 text-white font-poppins font-weight-600">
        New password
      </div>

      {apiError ? (
        <p className="text-red-600 text-lg my-2">{apiError}</p>
      ) : (
        <></>
      )}
      <form
        className="w-full mt-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {FORM_FIELDS.map((item, index: number) => (
          <Fragment key={`reset-password-form-${index}`}>
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

        <button
          className="flex items-center mt-4 justify-center self-stretch rounded-lg bg-primary-900-high-emphasis py-2 px-3 hover:bg-primary-900-medium-emphasis w-full text-white text-center font-inter text-lg font-semibold leading-[2.202rem]"
          type="submit"
        >
          Send
        </button>
      </form>
      <p className="mt-2 text-sm leading-10 text-gray-300 font-inter">
        Know Your Password?
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

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");

  const closeModal = () => setOpen(false);

  useEffect(() => {
    const urlParams = urlToJson(location.search);
    if (!urlParams || !("token" in urlParams)) {
      navigate("/");
      return;
    }

    setToken(urlParams.token);
    setOpen(true);
  }, [location]);

  return (
    <>
      <CustomModal
        open={open}
        handleClose={closeModal}
        body={<Form token={token} closeModal={closeModal} />}
      />
    </>
  );
};

export default ResetPassword;
