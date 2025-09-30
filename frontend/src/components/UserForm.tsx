// components/UserForm.tsx (Com correção para exibir os campos na edição, tornando a mudança de senha opcional)
import { UserIcon, EyeClosed, Eye, Lock } from "lucide-react";
import React from "react";
import InputField from "./InputField";
import Message from "./Message";
import SelectField from "./SelectField";

export default function UserForm({
  formData,
  fieldErrors,
  handleChange,
  isEditing,
}: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const nivelAcesso = [
    { value: 'admin', label: 'Administrador' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Visualizador' },
  ];

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* Nome */}
        <div>
          <InputField
            type="text"
            placeholder="Nome e Sobrenome"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            icon={<UserIcon size={16} />}
          />
          {fieldErrors.name && (
            <Message message={fieldErrors.name} variant="error" className="text-red-500 text-sm mt-1" />
          )}
        </div>

        {/* Email */}
        <div>
          <InputField
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            icon={<UserIcon size={16} />}
          />
          {fieldErrors.email && (
            <Message message={fieldErrors.email} variant="error" className="text-red-500 text-sm mt-1" />
          )}
        </div>

        {/* Nível de acesso */}
        <div>
          <SelectField
            value={formData.nivel}
            onChange={(e) => handleChange("nivel", e.target.value)}
            options={nivelAcesso}
            placeholder="Selecione o nível de acesso"
            required
            leftIcon={<UserIcon size={16} />}
            name="nivel"
          />
          {fieldErrors.nivel && (
            <Message message={fieldErrors.nivel} variant="error" className="text-red-500 text-sm mt-1" />
          )}
        </div>

        {/* Senha e confirmação: Agora sempre visíveis, mas opcionais na edição */}
        <div className={`mt-2 ${isEditing ? 'border-t pt-4 border-gray-200' : ''}`}>
            {isEditing && <p className="text-sm text-gray-500 mb-2">Preencha os campos abaixo apenas se desejar alterar a senha:</p>}
        </div>
        
        <div>
            <InputField
                type={showPassword ? "text" : "password"}
                placeholder={isEditing ? "Nova Senha (Opcional)" : "Senha"}
                value={formData.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                required={!isEditing} // Requerido apenas na criação
                icon={<Lock size={16} />}
                actionIcon={showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                onActionClick={() => setShowPassword((s) => !s)}
            />
            {fieldErrors.password && (
                <Message message={fieldErrors.password} variant="error" className="text-red-500 text-sm mt-1" />
            )}
        </div>

        <div>
            <InputField
                type={showConfirmPassword ? "text" : "password"}
                placeholder={isEditing ? "Confirmar Nova Senha" : "Confirmar Senha"}
                value={formData.confirmPassword || ""}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required={!isEditing} // Requerido apenas na criação
                icon={<Lock size={16} />}
                actionIcon={showConfirmPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                onActionClick={() => setShowConfirmPassword((s) => !s)}
            />
            {fieldErrors.confirmPassword && (
                <Message message={fieldErrors.confirmPassword} variant="error" className="text-red-500 text-sm mt-1" />
            )}
        </div>
      </div>
    </div>
  );
}