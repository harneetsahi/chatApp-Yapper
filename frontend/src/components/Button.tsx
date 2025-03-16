import React from "react";

interface ButtonProps {
  variant: "primary" | "chat" | "sendMessage";
  text: string | React.JSX.Element;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  primary:
    "w-80 hover:scale-x-103 transition-all rounded-md px-4 py-2 text-gray-800",
  chat: "rounded-md px-4 py-2",
  sendMessage: "bg-transparent border-none ",
};

const defaultStyles = "border-1 border-gray-700 bg-gray-100  cursor-pointer";

function Button({ variant, text, type, onClick, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${variantStyles[variant]} ${defaultStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
