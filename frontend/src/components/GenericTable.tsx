import { ReactNode } from "react";

type GenericTableProps<T extends { id: number | string }> = {
  data: T[];
  columnsNames?: string[]; // cabeçalho customizado
  columnsKeys?: (keyof T)[]; // ordem das colunas
  actions?: (item: T) => ReactNode; // JSX de ações por linha
};

export function GenericTable<T extends { id: number | string }>({
  data,
  columnsNames,
  columnsKeys,
  actions,
}: GenericTableProps<T>) {
  // Se columnsKeys não for passado, pega todas as chaves do objeto
  const keys: (keyof T)[] =
    columnsKeys || (data[0] ? (Object.keys(data[0]) as (keyof T)[]) : []);

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
      <thead className="bg-emerald-100">
        <tr>
          {keys.map((key, index) => (
            <th
              key={String(key)}
              className="px-6 py-3 text-center text-sm font-semibold text-emerald-800"
            >
              {columnsNames?.[index] || String(key)}
            </th>
          ))}
          {actions && (
            <th className="px-6 py-3 text-center text-sm font-semibold text-emerald-800">
              Ações
            </th>
          )}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-emerald-50">
            {keys.map((key) => (
              <td
                key={String(key)}
                className="px-6 py-4 text-center whitespace-nowrap text-sm text-emerald-800"
              >
                {item[key] != null ? String(item[key]) : ""}
              </td>
            ))}
            {actions && (
              <td className="px-6 py-4 text-center">{actions(item)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
