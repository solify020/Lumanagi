import React, { useMemo } from "react";

interface ButtonType {
  onClick?: any;
  label?: JSX.Element | string;
  color?: string;
  size?: string;
  customStyle?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({
  label = "",
  onClick = () => {},
  color = "primary",
  size = "md",
  customStyle = "",
  disabled = false,
  title = "",
  type = "button",
}: ButtonType) {
  const buttonStyle = useMemo(() => {
    let style = "";

    switch (color) {
      case "primary": {
        style += "bg-[#FF073A] text-white";
        break;
      }
      case "secondary": {
        style += "bg-gradient-to-b from-[#414593] to-[#00022E] text-white";
        break;
      }
      case "success": {
        style += "bg-[#596CC3] text-white";
        break;
      }
      case "dangerText": {
        style += "bg-[#259da814] text-[#FE0639]";
        break;
      }
      case "danger": {
        style += "bg-[#9A315B] text-white";
        break;
      }

      default:
        style += "text-[#FE0639] text-white bg-[#259da814]";
    }

    switch (size) {
      case "sm": {
        style += " py-2 px-4 rounded-lg text-sm";
        break;
      }
      default: {
        style += " py-2 px-4 rounded-md";
      }
    }

    return style;
  }, [color, size]);

  return (
    <button
      onClick={onClick}
      className={`${buttonStyle} ${customStyle}`}
      disabled={disabled}
      title={title}
      type={type}
    >
      {label}
    </button>
  );
}

export default Button;
