import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm, useWatch } from "react-hook-form";

import { ReactComponent as CopyIcon } from "../../assets/images/copy.svg";
import { getApi, putApi } from "../../services/axios.service";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { ActionTypes, AuthContext } from "../../contexts/AuthContext";

type InputProps = {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  EndIcon?: any;
  props?: any;
};

type ProfileImageProps = {
  label: string;
  inputRef: any;
  size?: string;
  selectedImage: any;
  setImage: any;
  handleImageSelect: any;
  type: string;
};

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  customClass?: string;
  isValid?: boolean;
  isLoading?: boolean;
  onClick?: any;
};

const Button = ({
  type = "button",
  label,
  customClass = "",
  isLoading = false,
  isValid = true,
  onClick,
}: ButtonProps) => {
  const invalidStyles = !isValid
    ? "user-select-none pointer-events-none opacity-50"
    : "";
  return (
    <button
      type={type}
      className={`w-fit px-4 py-2 bg-gradient-to-br from-[#414593] via-[#00022E] to-transparent text-white text-lg font-urbanist font-bold ${customClass} ${invalidStyles}`}
      disabled={!isValid}
      {...(onClick ? { onClick } : {})}
    >
      {label}
    </button>
  );
};

type Label = {
  label: string;
  className?: string;
};

const Label = ({ label, className = "" }: Label) => (
  <span className={`text-white font-urbanist text-lg font-medium ${className}`}>
    {label}
  </span>
);

const Input = ({
  type,
  label,
  name,
  placeholder,
  EndIcon,
  props,
}: InputProps) => {
  return (
    <>
      <div className="relative grid">
        <Label label={label} className="mb-2" />
        {type === "text" ? (
          <input
            type={type}
            className="px-3 py-3 text-lg font-normal text-black bg-gray-400 font-urbanist placeholder:text-gray-600 placeholder:text-sm focus:outline-none"
            placeholder={placeholder}
            name={name}
            {...props}
          />
        ) : (
          <textarea
            className="px-3 py-3 text-lg font-normal text-black bg-gray-400 resize-none font-urbanist placeholder:text-gray-600 placeholder:text-sm focus:outline-none"
            placeholder={placeholder}
            name={name}
            {...props}
          />
        )}
        {EndIcon ? (
          <div className="absolute top-[50px] right-[10px]">{EndIcon}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const ImageSelector = ({
  label,
  handleImageSelect,
  size = "w-28 h-28",
  selectedImage,
  inputRef,
  setImage,
  type = "profile",
}: ProfileImageProps) => {
  return (
    <div
      className="relative mb-4 cursor-pointer max-w-fit"
      onClick={() => inputRef?.current?.click()}
    >
      <Label label={label} />
      {selectedImage ? (
        <>
          <img
            className={`rounded-md ${size}`}
            src={URL.createObjectURL(selectedImage)}
            alt="Profile"
          />
          <button
            className="text-gray-100 text-lg cursor-pointer absolute top-[24px] right-[5px]"
            onClick={(e) => {
              e.stopPropagation();
              setImage(null);
            }}
          >
            &times;
          </button>
        </>
      ) : (
        <div className={`bg-gray-400 rounded-md ${size}`}></div>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => handleImageSelect(e, type)}
        hidden
      />
    </div>
  );
};

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps) => {
  return (
    <>
      {tags.map((tag, index) => (
        <Fragment key={`tag-item-${index}`}>
          <p className="bg-[#757575] max-w-fit text-xs text-white rounded-lg px-1">
            {tag}
          </p>
        </Fragment>
      ))}
    </>
  );
};

const EditProfile = () => {
  const { user, updateUserInfo } = useAuth();
  const { updateAuthAction } = useContext(AuthContext);
  const profileImageInputRef: any = useRef(null);
  const banner1InputRef: any = useRef(null);

  const [profileImage, setProfileImage] = useState<any>(null);
  const [banner1, setBanner1] = useState<any>(null);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();

  const username = watch("username");

  const handleImageSelect = (e: any, type = "profile") => {
    const file = e.target.files[0];
    if (type === "profile") setProfileImage(file);
    else if (type === "banner1") setBanner1(file);
  };

  const onSubmit = async (data: any) => {
    try {
      setApiError("");
      await putApi("/users/", data);
      await updateUserInfo();
      toast.success("Updated successfully");
    } catch (e: any) {
      console.log("Error: ", e?.response?.data || e);
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  };

  const checkUsernameExists = async () => {
    try {
      // Send a request to your API to check if the username already exists
      const response = await getApi(`/users/exists/username/${username}`);

      if (response.data.exists) {
        setError("username", {
          type: "validate",
          message: "Username already exists!",
        });
        return false;
      }
      clearErrors("username");
      return true;
    } catch (error) {
      console.error("Error checking username:", error);
    }
    return ""; // Return an empty string if no error
  };

  const FORM_FIELDS: InputProps[] = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
      props: {
        ...register("firstName", {
          required: "First Name is required",
        }),
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      type: "text",
      props: {
        ...register("lastName", {
          required: "Last Name is required",
        }),
      },
    },
    {
      name: "username",
      label: "Enter Username/Nickname",
      placeholder: "Enter username",
      type: "text",
      props: {
        ...register("username", {
          required: "Username is required",
          onBlur: checkUsernameExists,
        }),
      },
    },
    {
      name: "intro",
      label: "About me",
      placeholder: "About...",
      type: "textfield",
      props: {
        ...register("intro", {
          required: "About me is required",
        }),
      },
    },
    {
      name: "wallet_address",
      label: "Wallet Address",
      placeholder: "0x72e6663e20504b6153d4c5",
      type: "text",
      EndIcon: <CopyIcon className="cursor-pointer" />,
      props: {
        readOnly: true,
      },
    },
  ];

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("username", user.username);
      setValue("intro", user.intro);
    }
  }, [user]);

  return (
    <>
      <div className="grid grid-cols-2 col-span-4 gap-4 mx-20">
        <div className="col-span-auto">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {FORM_FIELDS.map((field, index) => (
              <div className="mb-2" key={`field-${index}`}>
                <Input {...field} />
                {field.name in errors && (
                  <p className="text-sm text-red-600">
                    {/* @ts-ignore */}
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </div>
            ))}
            <Button
              type="submit"
              label="Update"
              customClass="rounded-md"
              isLoading={isLoading}
              isValid={Object.values(errors).length === 0 && !isLoading && !isSubmitting}
            />
          </form>
        </div>
        <div className="col-span-auto">
          <ImageSelector
            label="Profile Image"
            handleImageSelect={handleImageSelect}
            selectedImage={profileImage}
            inputRef={profileImageInputRef}
            setImage={setProfileImage}
            type="profile"
            size="w-28 h-24"
          />
          <ImageSelector
            label="Banner Image"
            handleImageSelect={handleImageSelect}
            selectedImage={banner1}
            inputRef={banner1InputRef}
            setImage={setBanner1}
            type="banner1"
            size="w-48 h-24"
          />
          <div className="flex flex-col gap-2 my-2">
            <Label label="Password" />
            <Button
              type="button"
              onClick={() => {
                updateAuthAction(ActionTypes.ChangePassword);
              }}
              label="Change Password"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <Label label="My Titles" />
            <Tags tags={["Beginner"]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
