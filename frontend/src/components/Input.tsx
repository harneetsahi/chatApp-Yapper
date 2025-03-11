interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  variant: "primary" | "chat";
}

const variantStyles = {
  primary: "w-100 hover:scale-x-103 transition-all",
  chat: "w-full font-light",
};

const defaultStyles = "border-1 border-gray-700 px-4 py-2 rounded-lg";

function Input({ type, name, id, placeholder, variant }: InputProps) {
  return (
    <input
      className={`${variantStyles[variant]} ${defaultStyles}`}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
    />
  );
}

export default Input;
