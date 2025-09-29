// components/UsersTable.tsx
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { GenericTable } from "./GenericTable";
import { User } from "../hooks/useUsers";

type Props = {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
};

export default function UsersTable({ users, onEdit, onDelete }: Props) {
  return (
    <GenericTable
      data={users}
      columnsNames={["Nome", "Email", "Nível de Acesso"]}
      columnsKeys={["name", "email", "role"]}
      actions={(user) => (
        <div className="flex gap-4 justify-center">
          <button className="text-emerald-600 hover:text-emerald-800" onClick={() => onEdit(user)} title="Editar">
            <Edit size={16} />
          </button>
          <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(user)} title="Excluir">
            <Trash2 size={16} />
          </button>
        </div>
      )}
    />
  );
}
