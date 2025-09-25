import React from "react";

type InputFieldProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: string;
};

export default function InputField({ type, placeholder, value, onChange, style }: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={style ?? "border-2 border-emerald-300 rounded-md w-80 h-10 px-2"}
    />
  );
}
