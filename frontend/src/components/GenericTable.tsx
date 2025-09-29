// components/GenericTable.tsx
import { ReactNode } from "react";

type GenericTableProps<T extends object> = {
  data: T[];
  columnsNames?: string[]; 
  columnsKeys?: (keyof T)[]; 
  actions?: (item: T) => ReactNode; 
  idKey?: keyof T; // Chave usada para o React 'key' (ex: "matricula")
};

export function GenericTable<T extends object>({
  data,
  columnsNames,
  columnsKeys,
  actions,
  idKey, 
}: GenericTableProps<T>) {
  
  const keys: (keyof T)[] =
    columnsKeys || (data[0] ? (Object.keys(data[0]) as (keyof T)[]) : []);

  if (!data || data.length === 0) {
      return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">Nenhum registro encontrado</p>
          </div>
      );
  }

  // Define a chave de ID final (prioriza idKey, senão a primeira chave de dados)
  const finalIdKey: keyof T = idKey || keys[0];

  return (
    <div className="overflow-x-auto">
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
            {data.map((item, index) => (
              <tr key={String(item[finalIdKey]) || index} className="hover:bg-emerald-50"> 
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
    </div>
  );
}