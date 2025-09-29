// hooks/useUsers.ts
import { useCallback, useState } from "react";
import api from "../utils/api";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UpdateUserDto = Partial<CreateUserDto>;

type ApiError = {
  response?: { data?: { message?: string } };
  message?: string;
};

export function useUsers(initial: User[] = []) {
  const [users, setUsers] = useState<User[]>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<User[]>("/admin");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const e = err as ApiError;
      setError(e?.response?.data?.message || e?.message || "Erro ao buscar usuários.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (payload: CreateUserDto) => {
      const res = await api.post<User>("/admin/create", payload);
      await fetchUsers();
      return res.data;
    },
    [fetchUsers]
  );

  const updateUser = useCallback(
    async (id: number, payload: UpdateUserDto) => {
      const res = await api.put<User>(`/admin/${id}`, payload);
      await fetchUsers();
      return res.data;
    },
    [fetchUsers]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      const res = await api.delete<{ success: boolean }>(`/admin/${id}`);
      await fetchUsers();
      return res.data;
    },
    [fetchUsers]
  );

  return { users, setUsers, loading, error, fetchUsers, createUser, updateUser, deleteUser };
}
