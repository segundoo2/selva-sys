import { useState, useEffect, useCallback, useMemo } from "react";
import { Edit, Trash2, Mail, Lock, User, EyeClosed, Eye, AlertTriangle, Search } from "lucide-react";
import Layout from "../components/Layout";
import { Title } from "../components/Title";
import { GenericTable } from "../components/GenericTable";
import Modal from "../components/Modal";
import GenericForm from "../components/GenericForm";
import InputField from "../components/InputField";
import SelectField, { SelectOption } from "../components/SelectField";
import Message from "../components/Message";
import api from "../utils/api";

type Users = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Props = {
  users: Users[];
};

type FieldErrors = {
  [key: string]: string;
};

// Hook personalizado para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function UsersPage({ users: initialUsers }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nivel: "",
    password: "",
    confirmPassword: ""
  });
  const [users, setUsers] = useState<Users[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para o termo de busca
  const [isLoading, setIsLoading] = useState(false); // Estado para carregamento
  const [searchError, setSearchError] = useState(""); // Estado para erro na busca
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // global success/error removed from UI per request but kept for logic if needed
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  // modal-only messages
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalError, setModalError] = useState<string>("");

  const [editingUser, setEditingUser] = useState<Users | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce de 300ms

  const nivelAcesso: SelectOption[] = [
    { value: "admin", label: "Administrador" },
    { value: "diretor", label: "Diretor" },
    { value: "secretario", label: "Secretário" },
    { value: "tesoureiro", label: "Tesoureiro" },
    { value: "instrutor", label: "Instrutor" },
    { value: "conselheiro", label: "Conselheiro" }
  ];

  // Busca inicial do servidor (mantemos para operações CRUD)
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setSearchError("");
    try {
      const response = await api.get("/admin");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Erro ao buscar usuários.";
      setSearchError(String(errorMessage).replace(/^"|"$/g, ""));
      setUsers([]); // Limpa a tabela em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carrega lista inicial apenas uma vez (ou quando fetchUsers mudar)
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filtragem local (frontend-only)
  const filteredUsers = useMemo(() => {
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      (u.name ?? "").toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q) ||
      (u.role ?? "").toLowerCase().includes(q)
    );
  }, [debouncedSearchQuery, users]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFieldErrors({});
    setSuccess("");
    setError("");
    setModalMessage("");
    setModalError("");
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFieldErrors({});
    setSuccess("");
    setError("");
    setModalMessage("");
    setModalError("");
    setFormData({ name: "", email: "", nivel: "", password: "", confirmPassword: "" });
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setUserToDelete(null);
  };

  const handleEditUser = (user: Users) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      nivel: user.role,
      password: "",
      confirmPassword: ""
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setFieldErrors({});
    setSuccess("");
    setError("");
    setModalMessage("");
    setModalError("");
  };

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setIsConfirmModalOpen(true);
    setError("");
    setSuccess("");
  };

  const confirmDeleteUser = async () => {
    if (userToDelete === null) return;

    handleCloseConfirmModal();

    try {
      await api.delete(`/admin/${userToDelete}`);
      setSuccess("Usuário excluído com sucesso! ✅");
      setError("");
      await fetchUsers(); // Atualiza a lista após exclusão
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Erro desconhecido ao excluir o usuário.";
      setError("Erro ao excluir usuário: " + String(errorMessage).replace(/^"|"$/g, ""));
      setSuccess("");
    } finally {
      setUserToDelete(null);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Nome é obrigatório";
        } else if (value.trim().length < 2) {
          error = "Mínimo 2 caracteres";
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value.trim())) {
          error = "Apenas letras e espaços";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "E-mail é obrigatório";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            error = "Formato de e-mail inválido";
          }
        }
        break;
      case "nivel":
        if (!value) {
          error = "Selecione o nível de acesso";
        }
        break;
      case "password":
        if (!value && !isEditing) {
          error = "Senha é obrigatória";
        } else if (value && value.length < 6) {
          error = "Mínimo 6 caracteres";
        } else if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {
          error = "Precisa ter: maiúscula, minúscula, número e símbolo";
        }
        break;
      case "confirmPassword":
        const passwordRequired = !isEditing || formData.password;
        if (passwordRequired && !value) {
          error = "Confirmação obrigatória";
        } else if (value && formData.password !== value) {
          error = "Senhas não coincidem";
        }
        break;
    }
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.name.trim())) {
      errors.name = "Nome deve conter apenas letras e espaços";
    }
    if (!formData.email.trim()) {
      errors.email = "E-mail é obrigatório";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "E-mail deve ter um formato válido";
      }
    }
    if (!formData.nivel) {
      errors.nivel = "Nível de acesso é obrigatório";
    }

    // Apenas validar senha quando não for edição (criação)
    if (!isEditing || (isEditing && formData.password)) {
      if (!formData.password && !isEditing) {
        errors.password = "Senha é obrigatória";
      } else if (formData.password && formData.password.length < 6) {
        errors.password = "Senha deve ter pelo menos 6 caracteres";
      } else if (formData.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
        errors.password = "Senha deve conter pelo menos uma letra minúscula, uma maiúscula, um número e um caractere especial";
      }
    }

    if (formData.password) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "As senhas não coincidem";
      }
    } else if (!isEditing && !formData.confirmPassword) {
      errors.confirmPassword = "Confirmação de senha é obrigatória";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mapErrorsToFields = (errors: string[]): FieldErrors => {
    const fieldErrorMap: FieldErrors = {};
    errors.sort((a, b) => b.length - a.length).forEach(error => {
      const lowerError = error.toLowerCase();
      if ((lowerError.includes("nome") || lowerError.includes("name")) && !fieldErrorMap.name) {
        fieldErrorMap.name = error;
      } else if ((lowerError.includes("email") || lowerError.includes("e-mail")) && !fieldErrorMap.email) {
        fieldErrorMap.email = error;
      } else if ((lowerError.includes("nível") || lowerError.includes("nivel") || lowerError.includes("acesso") || lowerError.includes("role")) && !fieldErrorMap.nivel) {
        fieldErrorMap.nivel = error;
      } else if ((lowerError.includes("senha") || lowerError.includes("password")) && !fieldErrorMap.password) {
        fieldErrorMap.password = error;
      } else {
        if (!fieldErrorMap.name) fieldErrorMap.name = error;
        else if (!fieldErrorMap.email) fieldErrorMap.email = error;
        else if (!fieldErrorMap.nivel) fieldErrorMap.nivel = error;
        else if (!fieldErrorMap.password) fieldErrorMap.password = error;
      }
    });
    return fieldErrorMap;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setSuccess("");
    setError("");
    setModalMessage("");
    setModalError("");
    if (!validateForm()) {
      return;
    }
    const dataToSend: any = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.nivel
    };
    if (formData.password) {
      dataToSend.password = formData.password;
    }
    try {
      if (isEditing && editingUser) {
        await api.put(`/admin/${editingUser.id}`, dataToSend);
        // show only inside modal
        setModalMessage("Usuário atualizado com sucesso! ✨");
        setModalError("");
      } else {
        await api.post("/admin/create", dataToSend);
        setModalMessage("Usuário cadastrado com sucesso! 🎉");
        setModalError("");
      }
      setFormData({ name: "", email: "", nivel: "", password: "", confirmPassword: "" });
      await fetchUsers(); // Atualiza a lista após cadastro/edição
    } catch (err: any) {
      const backendErrors = err.response?.data?.message;
      let message = err.message || "Erro de rede/conexão desconhecido.";
      if (backendErrors) {
        if (Array.isArray(backendErrors)) {
          const cleaned = backendErrors.map((m: string) => String(m).replace(/^"|"$/g, ""));
          setFieldErrors(mapErrorsToFields(cleaned));
          message = cleaned[0] || message;
        } else {
          message = String(backendErrors).replace(/^"|"$/g, "") || message;
        }
      }
      setModalError(message);
      setModalMessage("");
    }
  };

  useEffect(() => {
    if (formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.password]);

  // clear modal messages together with global ones if any
  useEffect(() => {
    if (modalMessage || modalError || success || error || searchError) {
      const timer = setTimeout(() => {
        setModalMessage("");
        setModalError("");
        setSuccess("");
        setError("");
        setSearchError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [modalMessage, modalError, success, error, searchError]);

  return (
    <Layout title="Usuários" description="Gerenciamento de usuários do sistema">
      <section className="flex items-center justify-between mb-4">
        <Title text="Gerenciar Usuário" />
        <button
          className="bg-emerald-800 text-emerald-100 font-bold rounded-md w-40 h-10 hover:bg-emerald-900 transition-colors"
          onClick={handleOpenModal}
        >
          Cadastrar Usuário
        </button>
      </section>

      {/* Campo de busca (frontend-only) */}
      <div className="flex justify-start mx-2">
        <div className="w-64">
          <InputField
            type="text"
            placeholder="Pesquisar (nome, e-mail, nível)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            icon={<Search size={16} className="text-emerald-600" />}
            disabled={isLoading}
          />
          {searchError && (
            <div className="mt-2">
              <Message message={searchError} variant="error" />
            </div>
          )}
        </div>
      </div>

      {/* Espaçamento entre busca e tabela */}
      <div className="mt-6" />

      <GenericTable
        data={filteredUsers}
        columnsNames={["Nome", "Email", "Nível de Acesso"]}
        columnsKeys={["name", "email", "role"]}
        actions={user => (
          <div className="flex gap-4 justify-center">
            <button
              className="text-emerald-600 hover:text-emerald-800 transition-colors"
              onClick={() => handleEditUser(user)}
              title="Editar usuário"
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-800 transition-colors"
              onClick={() => handleDeleteUser(user.id)}
              title="Excluir usuário"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      />

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? "Editar Usuário" : "Cadastrar Usuário"}
        size="md"
        closeOnOverlayClick
        ariaLabel={isEditing ? "Edição de usuário" : "Cadastro de usuário"}
        footer={
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              onClick={handleCloseModal}
              type="button"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="register-form"
              className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900 transition-colors"
            >
              {isEditing ? "Atualizar" : "Salvar"}
            </button>
          </div>
        }
      >
        <GenericForm id="register-form" onSubmit={handleSubmit} className="space-y-1">
          {/* Mensagens agora aparecem somente dentro do modal */}
          {modalMessage && (
            <div className="flex flex-col items-center w-full">
              <div className="w-80">
                <Message message={modalMessage} variant="success" />
              </div>
            </div>
          )}
          {modalError && (
            <div className="flex flex-col items-center w-full">
              <div className="w-80">
                <Message message={modalError} variant="error" />
              </div>
            </div>
          )}

          <div className="flex flex-col items-center w-full">
            <InputField
              type="text"
              placeholder="Nome e Sobrenome"
              value={formData.name}
              onChange={e => handleChange("name", e.target.value)}
              required
              icon={<User size={16} />}
            />
            {fieldErrors.name && (
              <div className="w-80">
                <Message message={fieldErrors.name} variant="error" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <InputField
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={e => handleChange("email", e.target.value)}
              required
              icon={<Mail size={16} />}
            />
            {fieldErrors.email && (
              <div className="w-80">
                <Message message={fieldErrors.email} variant="error" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <SelectField
              value={formData.nivel}
              onChange={e => handleChange("nivel", e.target.value)}
              options={nivelAcesso}
              placeholder="Selecione o nível de acesso"
              required
              leftIcon={<User size={16} />}
              name="nivel"
            />
            {fieldErrors.nivel && (
              <div className="w-80">
                <Message message={fieldErrors.nivel} variant="error" />
              </div>
            )}
          </div>

          {/* Somente mostrar campos de senha no modo de criação */}
          {!isEditing && (
            <>
              <div className="flex flex-col items-center w-full">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={formData.password}
                  onChange={e => handleChange("password", e.target.value)}
                  required
                  icon={<Lock size={16} />}
                  actionIcon={showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                  onActionClick={() => setShowPassword(!showPassword)}
                />
                {fieldErrors.password && (
                  <div className="w-80">
                    <Message message={fieldErrors.password} variant="error" />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center w-full">
                <InputField
                  type={showPasswordConfirmed ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  value={formData.confirmPassword}
                  onChange={e => handleChange("confirmPassword", e.target.value)}
                  required
                  icon={<Lock size={16} />}
                  actionIcon={showPasswordConfirmed ? <EyeClosed size={16} /> : <Eye size={16} />}
                  onActionClick={() => setShowPasswordConfirmed(!showPasswordConfirmed)}
                />
                {fieldErrors.confirmPassword && (
                  <div className="w-80">
                    <Message message={fieldErrors.confirmPassword} variant="error" />
                  </div>
                )}
              </div>
            </>
          )}
        </GenericForm>
      </Modal>

      <Modal
        open={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        title="Confirmar Exclusão"
        size="sm"
        closeOnOverlayClick
        ariaLabel="Confirmação de exclusão de usuário"
        footer={
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              onClick={handleCloseConfirmModal}
              type="button"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeleteUser}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-bold"
            >
              Excluir
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center gap-4 text-center p-2">
          <AlertTriangle size={48} className="text-red-500" />
          <p className="text-lg font-semibold text-gray-700">Tem certeza que deseja excluir este usuário?</p>
          <p className="text-sm text-gray-500">Esta ação é irreversível.</p>
        </div>
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await api.get("/admin");
    const users: Users[] = Array.isArray(response.data) ? response.data : [];
    return { props: { users } };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return { props: { users: [] } };
  }
}
