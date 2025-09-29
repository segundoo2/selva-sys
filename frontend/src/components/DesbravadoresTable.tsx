// components/DesbravadoresTable.tsx
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { Desbravador } from "../pages/desbravadores";
import { GenericTable } from "./GenericTable"; 

interface DesbravadoresTableProps {
  desbravadores: Desbravador[];
  onEdit: (desbravador: Desbravador) => void;
  onDelete: (desbravador: Desbravador) => void;
}

export default function DesbravadoresTable({
  desbravadores,
  onEdit,
  onDelete,
}: DesbravadoresTableProps) {

  // O GenericTable lida com o estado de dados vazios, mas mantemos a verificação para clareza
  if (!desbravadores || desbravadores.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">Nenhum desbravador cadastrado</p>
      </div>
    );
  }

  // Colunas selecionadas para melhor visualização na tabela (mais as chaves de endereço)
  const columnsKeys: (keyof Desbravador)[] = [
    "matricula",
    "nome",
    "idade",
    "cpf",
    "cargo",
    "unidade",
    "nomeResponsavel",
    "telefoneResponsavel",
    "cidade",
    "estado",
  ];

  const columnsNames = [
    "Matrícula",
    "Nome",
    "Idade",
    "CPF",
    "Cargo",
    "Unidade",
    "Responsável",
    "Telefone Resp.",
    "Cidade",
    "Estado",
  ];
  
  // Renderizador para a coluna 'Ações'
  const actionsRenderer = (desbravador: Desbravador) => (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => onEdit(desbravador)}
        className="text-emerald-600 hover:text-emerald-900 transition-colors p-1"
        title="Editar"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => onDelete(desbravador)}
        className="text-red-600 hover:text-red-900 transition-colors p-1"
        title="Excluir"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <GenericTable<Desbravador>
        data={desbravadores}
        columnsKeys={columnsKeys}
        columnsNames={columnsNames}
        actions={actionsRenderer}
        idKey="matricula" // Define a chave de identificação
      />
    </div>
  );
}