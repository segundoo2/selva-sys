import React from "react";

type GenericFormProps = {
  id?: string;
  children: React.ReactNode; // qualquer input ou JSX
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export default function GenericForm({ id, children, onSubmit, className = "" }: GenericFormProps) {
  return (
    <form id={id} onSubmit={onSubmit} className="flex flex-col gap-4 items-center justify-center">
      {children}
    </form>
  );
}
