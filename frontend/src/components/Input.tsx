import React from "react";
import { themeClass } from "../lib/ThemeClass";

interface InputProps {
  icon?: React.JSX.Element;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  required?: boolean;
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
}: InputProps) {
  return (
    <>
      <label className={`input validator border-gray-700  ${themeClass}`}>
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
