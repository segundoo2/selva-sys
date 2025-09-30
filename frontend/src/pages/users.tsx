// pages/users.tsx
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
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


// importar validações
import { validateName, validateEmail, validateNivel, validatePassword, validateConfirmPassword } from "../utils/validators";
import UserForm from "../components/UserForm";
import SearchField from "../components/SearchField";

function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function UsersPage({ users: initialUsers }: { users: User[] }) {
  // OTIMIZAÇÃO: Não precisamos mais do fetchUsers() do hook, pois vamos manipular o estado localmente.
  // No entanto, vamos manter a estrutura do hook por enquanto, assumindo que ele já gerencia o estado.
  const { users, fetchUsers, createUser, updateUser, deleteUser, setUsers } = useUsers(initialUsers);

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

  // Mantemos o fetch inicial para garantir que o estado seja populado
  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return users;
    return users.filter(u =>
      (u.name ?? "").toLowerCase().includes(qq) ||
      (u.email ?? "").toLowerCase().includes(qq) ||
      (u.role ?? "").toLowerCase().includes(qq)
    );
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
        // Senha é obrigatória apenas na criação ou se houver valor na edição
        err = validatePassword(value, { required: !isEditing || !!value });
        break;
      case "confirmPassword":
        // Confirmação é obrigatória apenas se a senha principal for preenchida
        err = validateConfirmPassword(formData.password, value, { required: !isEditing || !!formData.password });
        break;
      default:
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
    // IMPORTANTE: Não pré-preencher senha em edição
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

  // OTIMIZAÇÃO: Deleta e atualiza o estado local
  const confirmDelete = async () => {
    if (!candidateToDelete) return setConfirmOpen(false);
    const userToDelete = candidateToDelete; // Guarda o usuário antes de resetar o estado
    setConfirmOpen(false);
    
    try {
      await deleteUser(userToDelete.id); // Assume que deleteUser atualiza o estado via useUsers
      
      // Otimização de UI: Atualiza o estado localmente sem re-fetch
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id)); 
      
      setModalMessage(`Usuário ${userToDelete.name} excluído com sucesso! ✅`);
    } catch (err: any) {
      setModalError(err?.response?.data?.message || "Erro ao excluir usuário");
    } finally {
      setCandidateToDelete(null);
    }
  };

  const validateForm = (): boolean => {
    // Validação de todos os campos visíveis
    const fieldsToValidate = ["name", "email", "nivel"];
    
    // Senha e confirmação só são necessárias na criação ou se a senha estiver preenchida na edição
    if (!isEditing || (isEditing && formData.password)) {
        fieldsToValidate.push("password", "confirmPassword");
    }

    let ok = true;
    
    // Forçar a validação de todos os campos
    fieldsToValidate.forEach(k => {
      const v = (formData as any)[k] ?? "";
      const valid = validateField(k, v);
      if (!valid) ok = false;
    });

    // Se estiver editando e a senha estiver vazia, remove erros de senha
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

  // OTIMIZAÇÃO: Cria/Edita e atualiza o estado local + Fechamento automático do modal
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
      let updatedUser: User;

      if (isEditing && editingUser) {
        updatedUser = await updateUser(editingUser.id, payload); // Assume que updateUser retorna o objeto atualizado
        setModalMessage("Usuário atualizado com sucesso! ✨");

        // Atualização otimizada do estado para Edição
        setUsers(prevUsers => 
            prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
        );

      } else {
        updatedUser = await createUser(payload); // Assume que createUser retorna o objeto criado
        setModalMessage("Usuário cadastrado com sucesso! 🎉");

        // Atualização otimizada do estado para Criação
        setUsers(prevUsers => [...prevUsers, updatedUser]);
      }
      
      // Fechamento automático do modal após 1.5s
      setTimeout(() => closeModal(), 1500);

    } catch (err: any) {
      const be = err?.response?.data?.message;
      setModalError(Array.isArray(be) ? be.join(", ") : (be || err.message || "Erro desconhecido"));
    }
  };

  useEffect(() => {
    if (!modalMessage && !modalError) return;
    // Se a mensagem for de sucesso (e não há erro), o modal fecha pelo handleSubmit/setTimeout
    const delay = modalError ? 3500 : 1500;
    const t = setTimeout(() => { setModalMessage(""); setModalError(""); }, delay);
    return () => clearTimeout(t);
  }, [modalMessage, modalError]);

  return (
    <Layout title="Usuários" description="Gerenciamento de usuários">
      <section className="flex items-center justify-between mb-4">
        <Title text="Gerenciar Usuário" />
        <button className="bg-emerald-800 text-emerald-100 font-bold rounded-md w-40 h-10 hover:bg-emerald-900 transition-colors" onClick={openCreate}>Cadastrar Usuário</button>
      </section>

      <div className="flex justify-start mb-4">
        <SearchField 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Pesquisar (nome, e-mail, nível)" 
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">Nenhum usuário cadastrado</p>
        </div>
      ) : (
        <UsersTable users={filtered} onEdit={openEdit} onDelete={tryDelete} />
      )}

      <Modal open={isModalOpen} onClose={closeModal} title={isEditing ? "Editar Usuário" : "Cadastrar Usuário"} size="md" footer={
        <div className="flex justify-end gap-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={closeModal}>Cancelar</button>
          <button type="submit" form="user-form" className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900">{isEditing ? "Atualizar" : "Salvar"}</button>
        </div>
      }>
        <GenericForm id="user-form" onSubmit={handleSubmit} className="space-y-2">
          {/* Messages agora ficam dentro do form, mas antes do UserForm */}
          {(modalMessage || modalError) && (
              <section className="flex flex-col gap-2 items-center">
                  {modalMessage && <Message message={modalMessage} variant="success" />}
                  {modalError && <Message message={modalError} variant="error" />}
              </section>
          )}
          <UserForm formData={formData} fieldErrors={fieldErrors} handleChange={handleChange} isEditing={isEditing} />
        </GenericForm>
      </Modal>

      <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} title="Confirmar Exclusão" description={`Tem certeza que deseja excluir o usuário ${candidateToDelete?.name} (${candidateToDelete?.email})?`} />
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