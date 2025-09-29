// pages/users.tsx
import { useEffect, useMemo, useState } from "react";
import { Edit, Trash2, Search } from "lucide-react";
import Layout from "../components/Layout";
import { Title } from "../components/Title";
import Modal from "../components/Modal";
import GenericForm from "../components/GenericForm";
import InputField from "../components/InputField";
import Message from "../components/Message";
import UsersTable from "../components/UsersTable";
import ConfirmModal from "../components/ConfirmModal";
import { useUsers, User } from "../hooks/useUsers";
import api from "../utils/api";
import UserForm from "../components/UseForm";

// importar validações
import { validateName, validateEmail, validateNivel, validatePassword, validateConfirmPassword } from "../utils/validators";

function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function UsersPage({ users: initialUsers }: { users: User[] }) {
  const { users, fetchUsers, createUser, updateUser, deleteUser } = useUsers(initialUsers);

  const [search, setSearch] = useState("");
  const q = useDebounce(search, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nivel: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [modalMessage, setModalMessage] = useState("");
  const [modalError, setModalError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<User | null>(null);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return users;
    return users.filter(u => (u.name ?? "").toLowerCase().includes(qq) || (u.email ?? "").toLowerCase().includes(qq) || (u.role ?? "").toLowerCase().includes(qq));
  }, [q, users]);

  const validateField = (field: string, value: string) => {
    let err = "";
    switch (field) {
      case "name":
        err = validateName(value);
        break;
      case "email":
        err = validateEmail(value);
        break;
      case "nivel":
        err = validateNivel(value);
        break;
      case "password":
        err = validatePassword(value, { required: !isEditing || !!value });
        break;
      case "confirmPassword":
        err = validateConfirmPassword(formData.password, value, { required: !isEditing || !!formData.password });
        break;
    }
    setFieldErrors(prev => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
    return !err;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
    if (field === "password" && formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }
  };

  const openCreate = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", nivel: "", password: "", confirmPassword: "" });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const openEdit = (u: User) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingUser(u);
    setFormData({ name: u.name, email: u.email, nivel: u.role, password: "", confirmPassword: "" });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setIsEditing(false);
    setFormData({ name: "", email: "", nivel: "", password: "", confirmPassword: "" });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const tryDelete = (u: User) => {
    setCandidateToDelete(u);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!candidateToDelete) return setConfirmOpen(false);
    setConfirmOpen(false);
    try {
      await deleteUser(candidateToDelete.id);
      setModalMessage("Usuário excluído com sucesso! ✅");
    } catch (err: any) {
      setModalError(err?.response?.data?.message || "Erro ao excluir usuário");
    } finally {
      setCandidateToDelete(null);
    }
  };

  const validateForm = (): boolean => {
    const keys = ["name","email","nivel","password","confirmPassword"];
    let ok = true;
    for (const k of keys) {
      const v = (formData as any)[k] ?? "";
      const valid = validateField(k, v);
      if (!valid) ok = false;
    }
    if (isEditing && !formData.password) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next.password;
        delete next.confirmPassword;
        return next;
      });
    }
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalMessage("");
    setModalError("");

    if (!validateForm()) return;

    const payload: any = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.nivel,
    };
    if (formData.password) payload.password = formData.password;

    try {
      if (isEditing && editingUser) {
        await updateUser(editingUser.id, payload);
        setModalMessage("Usuário atualizado com sucesso! ✨");
      } else {
        await createUser(payload);
        setModalMessage("Usuário cadastrado com sucesso! 🎉");
      }
      await fetchUsers();
      setFormData({ name: "", email: "", nivel: "", password: "", confirmPassword: "" });
    } catch (err: any) {
      const be = err?.response?.data?.message;
      setModalError(Array.isArray(be) ? be.join(", ") : (be || err.message || "Erro desconhecido"));
    }
  };

  useEffect(() => {
    if (!modalMessage && !modalError) return;
    const t = setTimeout(() => { setModalMessage(""); setModalError(""); }, 3500);
    return () => clearTimeout(t);
  }, [modalMessage, modalError]);

  return (
    <Layout title="Usuários" description="Gerenciamento de usuários">
      <section className="flex items-center justify-between mb-4">
        <Title text="Gerenciar Usuário" />
        <button className="bg-emerald-800 text-emerald-100 font-bold rounded-md w-40 h-10 hover:bg-emerald-900 transition-colors" onClick={openCreate}>Cadastrar Usuário</button>
      </section>

      <div className="flex justify-start mb-4">
        <div className="w-64">
          <InputField type="text" placeholder="Pesquisar (nome, e-mail, nível)" value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={16} className="text-emerald-600" />} />
        </div>
      </div>

      <UsersTable users={filtered} onEdit={openEdit} onDelete={tryDelete} />

      <Modal open={isModalOpen} onClose={closeModal} title={isEditing ? "Editar Usuário" : "Cadastrar Usuário"} size="md" footer={
        <div className="flex justify-end gap-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={closeModal}>Cancelar</button>
          <button type="submit" form="user-form" className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900">{isEditing ? "Atualizar" : "Salvar"}</button>
        </div>
      }>
        <GenericForm id="user-form" onSubmit={handleSubmit} className="space-y-2">
          {modalMessage && <Message message={modalMessage} variant="success" />}
          {modalError && <Message message={modalError} variant="error" />}
          <UserForm formData={formData} fieldErrors={fieldErrors} handleChange={handleChange} isEditing={isEditing} />
        </GenericForm>
      </Modal>

      <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} title="Confirmar Exclusão" description="Tem certeza que deseja excluir este usuário?" />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await api.get("/admin");
    return { props: { users: Array.isArray(res.data) ? res.data : [] } };
  } catch (err) {
    console.error(err);
    return { props: { users: [] } };
  }
}
