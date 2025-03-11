interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
}

function Input({ type, name, id, placeholder }: InputProps) {
  return (
    <input
      className="border-1 border-gray-700 px-4 py-2 rounded-lg w-100 hover:scale-x-103 transition-all"
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
    />
  );
}

export default Input;
