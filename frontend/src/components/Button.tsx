interface ButtonProps {
  variant: "primary" | "chat";
  text: string;
  onClick?: () => void;
}

const variantStyles = {
  primary: "w-100 hover:scale-x-103 transition-all",
  chat: "",
};

const defaultStyles =
  "border-1 border-gray-700 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 cursor-pointer";

function Button({ variant, text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles}`}
    >
      {text}
    </button>
  );
}

export default Button;
