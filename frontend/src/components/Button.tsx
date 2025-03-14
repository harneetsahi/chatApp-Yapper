import React from "react";

interface ButtonProps {
  variant: "primary" | "chat";
  text: string | React.JSX.Element;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  primary: "w-80 hover:scale-x-103 transition-all",
  chat: "",
};

const defaultStyles =
  "border-1 border-gray-700 py-2 rounded-md bg-gray-100 text-gray-800 cursor-pointer";

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
