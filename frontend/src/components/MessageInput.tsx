interface MessageInputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  variant: "primary" | "chat";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const variantStyles = {
  primary: "w-100 hover:scale-x-103 transition-all",
  chat: "w-full font-light",
};

const defaultStyles = "border-1 border-gray-700 px-4 py-2 rounded-3xl";

function MessageInput({
  type,
  name,
  id,
  placeholder,
  variant,
  value,
  onChange,
}: MessageInputProps) {
  return (
    <input
      className={`${variantStyles[variant]} ${defaultStyles} `}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default MessageInput;
