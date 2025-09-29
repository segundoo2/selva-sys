// components/DesbravadoresTable.tsx
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { Desbravador } from "../pages/desbravadores";
// 1. Importa o GenericTable (Assumindo que está em um caminho acessível, como './GenericTable')
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

  // O GenericTable agora lida com o estado de dados vazios,
  // mas vamos manter a verificação para fins de clareza (embora seja opcional).
  if (!desbravadores || desbravadores.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">Nenhum desbravador cadastrado</p>
      </div>
    );
  }

  // 2. Define a ordem das chaves do objeto Desbravador que serão exibidas
  const columnsKeys: (keyof Desbravador)[] = [
    "matricula",
    "nome",
    "idade",
    "cpf",
    "cargo",
    "unidade",
    "nomeResponsavel",
    "telefoneResponsavel",
  ];

  // 3. Define os nomes dos cabeçalhos na mesma ordem
  const columnsNames = [
    "Matrícula",
    "Nome",
    "Idade",
    "CPF",
    "Cargo",
    "Unidade",
    "Responsável",
    "Telefone",
  ];
  
  // 4. Define o JSX para a coluna 'Ações'
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

  // 5. Renderiza o GenericTable
  return (
    <div className="overflow-x-auto">
      <GenericTable
        data={desbravadores}
        columnsKeys={columnsKeys}
        columnsNames={columnsNames}
        actions={actionsRenderer}
      />
    </div>
  );
}