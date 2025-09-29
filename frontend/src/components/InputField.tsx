import React from "react";

type InputFieldProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
  error?: string;
};

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
  className,
  id,
  name,
  required,
  disabled,
  icon,
  actionIcon,
  onActionClick,
  error,
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={
            className ??
            `border-2 border-emerald-300 rounded-md w-full h-10 px-2 ${
              icon ? "pl-10" : ""
            } ${actionIcon ? "pr-10" : ""}`
          }
        />
        {actionIcon && (
          <button
            type="button"
            onClick={onActionClick}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-600 hover:text-emerald-800"
          >
            {actionIcon}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 text-left self-start">
          {error}
        </p>
      )}
    </div>
  );
}