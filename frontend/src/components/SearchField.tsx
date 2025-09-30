// components/SearchInput.tsx
import { Search } from "lucide-react";
import React from "react";
import InputField from "./InputField"; // Assumindo que InputField está no mesmo nível

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchField({
  value,
  onChange,
  placeholder = "Pesquisar...",
}: SearchFieldProps) {
  return (
    <div className="w-72">
      <InputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon={<Search size={16} className="text-emerald-600" />}
      />
    </div>
  );
}