interface MessageInputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  variant: "primary";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const variantStyles = {
  primary: "w-full  transition-all",
};

const defaultStyles =
  "border-1 dark:border-zinc-700 border-indigo-200 pl-4 pr-12 py-2 rounded-3xl";

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
      className={`${variantStyles[variant]} ${defaultStyles}  `}
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
