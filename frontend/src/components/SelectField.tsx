import React from "react";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectFieldProps = {
value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  className?: string;
  options?: SelectOption[]; // options dinâmicas
  placeholder?: string; // texto do option inicial
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode; // ícone opcional à esquerda
  width?: string; // ex: "w-80" para responsividade
};

export default function SelectField({
  value,
  onChange,
  id,
  name,
  className,
  options = [],
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  leftIcon,
  width = "w-full",
}: SelectFieldProps) {
  const baseClass =
    className ??
    `border-2 border-emerald-300 rounded-md h-10 px-2 ${width} appearance-none`;

  return (
    <div className={`relative ${width}`}>
      {leftIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-600">
          {leftIcon}
        </span>
      )}

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`${baseClass} ${leftIcon ? "pl-10" : ""} pr-8`}
        aria-label={name ?? id ?? "select-field"}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* seta à direita (visual) */}
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </span>
    </div>
  );
}
