import React from "react";

interface InputProps {
  icon?: React.JSX.Element;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  required?: boolean;
  className?: string;
}

function Input({
  icon,
  placeholder,
  type,
  name,
  id,
  onChange,
  value,
  minLength,
  maxLength,
  pattern,
  title,
  required,
  className,
}: InputProps) {
  return (
    <>
      <label
        className={`input validator border-1 border-gray-300 dark:border-gray-800 dark:bg-zinc-800/40 bg-neutral-50  ${className}`}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          title={title}
          required={required}
        />
      </label>
    </>
  );
}

export default Input;
