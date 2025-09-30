// pages/users.tsx (OTIMIZADO - SSR + CSR apenas para interações)

import { useMemo, useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { Title } from "../components/Title";
import Modal from "../components/Modal";
import GenericForm from "../components/GenericForm";
import Message from "../components/Message";
import UsersTable from "../components/UsersTable";
import ConfirmModal from "../components/ConfirmModal";
import { User } from "../hooks/useUsers";
import api from "../utils/api";
import { validateName, validateEmail, validateNivel, validatePassword, validateConfirmPassword } from "../utils/validators";
import UserForm from "../components/UserForm";
import SearchField from "../components/SearchField";
import { useRouter } from "next/router";

function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState<T>(value);
  
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  
  return v;
}

export default function UsersPage({ users: initialUsers = [] }: { users: User[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Estado apenas para UI e interações
  const [search, setSearch] = useState("");
  const q = useDebounce(search, 300);

  // Log para debug
  console.log('Users recebidos:', initialUsers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Filtragem client-side (necessária para busca em tempo real)
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return initialUsers;
    return initialUsers.filter(u =>
      (u.name ?? "").toLowerCase().includes(qq) ||
      (u.email ?? "").toLowerCase().includes(qq) ||
      (u.role ?? "").toLowerCase().includes(qq)
    );
  }, [q, initialUsers]);

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
    setFormData({ name: u.name, email: u.email, nivel: u.role, password: "", confirmPassword: "" });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const closeModal = () => {
    if (isLoading) return;
    
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
    const userToDelete = candidateToDelete;
    setConfirmOpen(false);
    
    try {
      await api.delete(`/admin/${userToDelete.id}`);
      // Recarrega via SSR após deletar
      router.replace(router.asPath);
    } catch (err: any) {
      setModalError(err?.response?.data?.message || "Erro ao excluir usuário");
      setTimeout(() => setModalError(""), 3500);
    } finally {
      setCandidateToDelete(null);
    }
  };

  const validateForm = (): boolean => {
    const fieldsToValidate = ["name", "email", "nivel"];
    
    if (!isEditing || (isEditing && formData.password)) {
        fieldsToValidate.push("password", "confirmPassword");
    }

    let ok = true;
    
    fieldsToValidate.forEach(k => {
      const v = (formData as any)[k] ?? "";
      const valid = validateField(k, v);
      if (!valid) ok = false;
    });

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

  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmittingRef.current || isLoading) return;

    setModalMessage("");
    setModalError("");

    if (!validateForm()) return;

    isSubmittingRef.current = true;
    setIsLoading(true);

    const payload: any = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.nivel,
    };
    if (formData.password) payload.password = formData.password;

    try {
      if (isEditing && editingUser) {
        await api.put(`/admin/${editingUser.id}`, payload);
        setModalMessage("Usuário atualizado com sucesso! ✨");
      } else {
        await api.post("/admin/create", payload);
        setModalMessage("Usuário cadastrado com sucesso! 🎉");
      }
      
      // Aguarda mensagem de sucesso ser vista
      setTimeout(() => {
        closeModal();
        // Recarrega dados via SSR
        router.replace(router.asPath);
      }, 1000);
      
    } catch (err: any) {
      const be = err?.response?.data?.message;
      setModalError(Array.isArray(be) ? be.join(", ") : (be || err.message || "Erro desconhecido"));
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };
  
  const handleManualSubmit = () => {
    if (isLoading || isSubmittingRef.current) return;
    
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Layout title="Usuários" description="Gerenciamento de usuários">
      <section className="flex items-center justify-between mb-4">
        <Title text="Gerenciar Usuário" />
        <button 
          className="bg-emerald-800 text-emerald-100 font-bold rounded-md w-40 h-10 hover:bg-emerald-900 transition-colors" 
          onClick={openCreate}
        >
          Cadastrar Usuário
        </button>
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
          <p className="text-gray-500 text-lg">
            {search ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
          </p>
        </div>
      ) : (
        <UsersTable users={filtered} onEdit={openEdit} onDelete={tryDelete} />
      )}

      <Modal 
        open={isModalOpen} 
        onClose={closeModal} 
        title={isEditing ? "Editar Usuário" : "Cadastrar Usuário"} 
        size="md" 
        footer={
          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" 
              onClick={closeModal}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="button"
              onClick={handleManualSubmit}
              className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : (isEditing ? "Atualizar" : "Salvar")}
            </button>
          </div>
        }
      >
        <GenericForm id="user-form" onSubmit={handleSubmit} ref={formRef} className="space-y-2">
          {(modalMessage || modalError) && (
            <section className="flex flex-col gap-2 items-center">
              {modalMessage && <Message message={modalMessage} variant="success" />}
              {modalError && <Message message={modalError} variant="error" />}
            </section>
          )}
          <UserForm 
            formData={formData} 
            fieldErrors={fieldErrors} 
            handleChange={handleChange} 
            isEditing={isEditing} 
          />
        </GenericForm>
      </Modal>

      <ConfirmModal 
        open={confirmOpen} 
        onClose={() => setConfirmOpen(false)} 
        onConfirm={confirmDelete} 
        title="Confirmar Exclusão" 
        description={`Tem certeza que deseja excluir o usuário ${candidateToDelete?.name} (${candidateToDelete?.email})?`} 
      />
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