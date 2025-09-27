// pages/users.tsx
import { useState, useEffect } from "react";
import { Edit, Trash2, Mail, Lock, User, EyeClosed, Eye } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import Layout from "../components/Layout";
import { Title } from "../components/Title";
import { GenericTable } from "../components/GenericTable";
import Modal from "../components/Modal";
import GenericForm from "../components/GenericForm";
import InputField from "../components/InputField";
import SelectField, { SelectOption } from "../components/SelectField";
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

const messageVariants: Variants = {
  hidden: { opacity: 0, y: -10, height: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
  show: { opacity: 1, y: 0, height: "auto", transition: { type: "spring", damping: 25, stiffness: 500 } },
  exit: { opacity: 0, y: -10, height: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
};

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
  const [users, setUsers] = useState(initialUsers);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState<string>("");

  const nivelAcesso: SelectOption[] = [
    { value: "admin", label: "Administrador" },
    { value: "diretor", label: "Diretor" },
    { value: "secretario", label: "Secretário" },
    { value: "tesoureiro", label: "Tesoureiro" },
    { value: "instrutor", label: "Instrutor" },
    { value: "conselheiro", label: "Conselheiro" }
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFieldErrors({});
    setSuccess("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFieldErrors({});
    setSuccess("");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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
      } else if ((lowerError.includes("senha") && (lowerError.includes("confirmar") || lowerError.includes("confirmação"))) && !fieldErrorMap.confirmPassword) {
        fieldErrorMap.confirmPassword = error;
      } else if ((lowerError.includes("senha") || lowerError.includes("password")) && !fieldErrorMap.password) {
        fieldErrorMap.password = error;
      } else {
        if (!fieldErrorMap.name) fieldErrorMap.name = error;
        else if (!fieldErrorMap.email) fieldErrorMap.email = error;
        else if (!fieldErrorMap.nivel) fieldErrorMap.nivel = error;
        else if (!fieldErrorMap.password) fieldErrorMap.password = error;
        else if (!fieldErrorMap.confirmPassword) fieldErrorMap.confirmPassword = error;
      }
    });
    
    return fieldErrorMap;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setSuccess("");

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      role: formData.nivel,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    try {
      const response = await api.post("/admin/create", dataToSend);
      setSuccess("Usuário cadastrado com sucesso!");
      setFormData({ name: "", email: "", nivel: "", password: "", confirmPassword: "" });

      const usersRes = await api.get("/admin");
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
    } catch (err: any) {
      if (err.response && err.response.data) {
        const backendErrors = Array.isArray(err.response.data.message)
          ? err.response.data.message.map((m: string) => m.replace(/^"|"$/g, ""))
          : [String(err.response.data.message).replace(/^"|"$/g, "")];
        setFieldErrors(mapErrorsToFields(backendErrors));
      } else {
        setFieldErrors({ email: err.message || "Erro desconhecido" });
      }
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Layout title="Usuários" description="Gerenciamento de usuários do sistema">
      <section className="flex items-center justify-between mb-10">
        <Title text="Gerenciar Usuário" />
        <button
          className="bg-emerald-800 text-emerald-100 font-bold rounded-md w-40 h-10"
          onClick={handleOpenModal}
        >
          Cadastrar Usuário
        </button>
      </section>

      <GenericTable
        data={users}
        columnsNames={["Nome", "Email", "Nível de Acesso"]}
        columnsKeys={["name", "email", "role"]}
        actions={user => (
          <div className="flex gap-4 justify-center">
            <button className="text-emerald-600 hover:text-emerald-800">
              <Edit size={16} />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      />

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Cadastrar Usuário"
        size="md"
        closeOnOverlayClick
        ariaLabel="Cadastro de usuário"
        footer={
          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" form="register-form" className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900">
              Salvar
            </button>
          </div>
        }
      >
        <GenericForm id="register-form" onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Nome Completo */}
          <div className="space-y-1">
            <InputField
              type="text"
              placeholder="Nome e Sobrenome"
              value={formData.name}
              onChange={e => handleChange("name", e.target.value)}
              required
              icon={<User size={16} />}
            />
            <AnimatePresence>
              {fieldErrors.name && (
                <motion.div variants={messageVariants} initial="hidden" animate="show" exit="exit" className="overflow-hidden">
                  <p className="text-red-600 text-sm px-1 py-1">{fieldErrors.name}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* E-mail */}
          <div className="space-y-1">
            <InputField
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={e => handleChange("email", e.target.value)}
              required
              icon={<Mail size={16} />}
            />
            <AnimatePresence>
              {fieldErrors.email && (
                <motion.div variants={messageVariants} initial="hidden" animate="show" exit="exit" className="overflow-hidden">
                  <p className="text-red-600 text-sm px-1 py-1">{fieldErrors.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nível de Acesso */}
          <div className="space-y-1">
            <SelectField
              value={formData.nivel}
              onChange={e => handleChange("nivel", e.target.value)}
              options={nivelAcesso}
              placeholder="Selecione o nível de acesso"
              required
              leftIcon={<User size={16} />}
              name="nivel"
            />
            <AnimatePresence>
              {fieldErrors.nivel && (
                <motion.div variants={messageVariants} initial="hidden" animate="show" exit="exit" className="overflow-hidden">
                  <p className="text-red-600 text-sm px-1 py-1">{fieldErrors.nivel}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Senha */}
          <div className="space-y-1">
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
            <AnimatePresence>
              {fieldErrors.password && (
                <motion.div variants={messageVariants} initial="hidden" animate="show" exit="exit" className="overflow-hidden">
                  <p className="text-red-600 text-sm px-1 py-1">{fieldErrors.password}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-1">
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
            <AnimatePresence>
              {fieldErrors.confirmPassword && (
                <motion.div variants={messageVariants} initial="hidden" animate="show" exit="exit" className="overflow-hidden">
                  <p className="text-red-600 text-sm px-1 py-1">{fieldErrors.confirmPassword}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mensagem de sucesso */}
          <AnimatePresence>
            {success && (
              <motion.div variants={messageVariants} initial="hidden" animate="show" exit="exit" className="overflow-hidden mt-2">
                <p className="text-green-600 text-sm px-1 py-1">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </GenericForm>
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
