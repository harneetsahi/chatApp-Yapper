import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "sendMessage" | "delete";
  text: string | React.JSX.Element;
  type?: "submit" | "button";
  disabled?: boolean;
  name?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantStyles = {
  primary:
    "md:w-80 w-70 hover:scale-x-103 transition-all rounded-md px-4 py-2 bg-indigo-500 text-white ",
  secondary:
    "md:w-80 w-70 rounded-sm py-1.5 md:px-6 px-4 text-center rounded-3xl bg-indigo-500 text-white hover:scale-103 transition-all",
  sendMessage: "bg-transparent border-none ",
  delete:
    "text-red-400 text-sm border-1 border-red-400 px-2 py-1 rounded-lg  hover:text-red-500 hover:border-red-500 transition-all",
};

const defaultStyles = " cursor-pointer";

function Button({ variant, text, type, onClick, disabled, name }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${variantStyles[variant]} ${defaultStyles}`}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {text}
    </button>
  );
}

export default Button;
