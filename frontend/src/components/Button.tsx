import React from "react";

interface ButtonProps {
  variant: "primary" | "chat" | "sendMessage";
  text: string | React.JSX.Element;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantStyles = {
  primary:
    "w-80 hover:scale-x-103 transition-all rounded-md px-4 py-2 bg-indigo-500  ",
  chat: "rounded-md px-4 py-2",
  sendMessage: "bg-transparent border-none ",
};

const defaultStyles = "bg-blue-100 cursor-pointer";

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
