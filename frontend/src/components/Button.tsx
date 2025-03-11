interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border-1 border-gray-700 px-4 py-2 rounded-lg w-100 bg-gray-100 text-gray-800 cursor-pointer hover:scale-x-103 transition-all"
    >
      {text}
    </button>
  );
}

export default Button;
