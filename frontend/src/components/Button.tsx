import React from "react";

interface ButtonProps {
  variant: "primary" | "chat" | "sendMessage";
  text: string | React.JSX.Element;
  type?: "submit" | "button";
  disabled?: boolean;
  name?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantStyles = {
  primary:
    "md:w-80 w-70 hover:scale-x-103 transition-all rounded-md px-4 py-2 bg-indigo-500 text-white ",
  chat: "rounded-md px-4 py-2",
  sendMessage: "bg-transparent border-none ",
};

const defaultStyles = "bg-blue-100 cursor-pointer";

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
