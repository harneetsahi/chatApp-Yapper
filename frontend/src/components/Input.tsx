import React from "react";

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
      <label className="input validator">
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
      {/* {type === "email" && (
        <p className="validator-hint hidden">Please enter a valid email</p>
      )}
      {type === "password" && (
        <p className="validator-hint hidden">
          Password must be between 8 to 16 characters long
          <br />
          with at least 1 number,
          <br />
          1 uppercase letter,
          <br />
          1 lowercase letter,
          <br />
          and 1 special character
        </p>
      )} */}
    </>
  );
}

export default Input;
