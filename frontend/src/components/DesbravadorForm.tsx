import {
  User,
  Hash,
  IdCard,
  Briefcase,
  Users,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import React from "react";
import InputField from "./InputField";
import Message from "./Message";
import SelectField from "./SelectField";

export default function DesbravadorForm({
  formData,
  fieldErrors,
  handleChange,
  isEditing,
}: any) {
  const cargos = [
    { value: "Desbravador", label: "Desbravador" },
    { value: "Diretor", label: "Diretor" },
    { value: "Diretor associado", label: "Diretor associado" },
    { value: "Instrutor", label: "Instrutor" },
    { value: "Secretário", label: "Secretário" },
    { value: "Tesoureiro", label: "Tesoureiro" },
    { value: "Capelão", label: "Capelão" },
    { value: "Conselheiro", label: "Conselheiro" },
    { value: "Apoio", label: "Apoio" },
  ];

  const unidades = [
    { value: "Gavião Real", label: "Gavião Real" },
    { value: "Jacaré", label: "Jacaré" },
    { value: "Lince", label: "Lince" },
    { value: "Pantera", label: "Pantera" },
    { value: "Pantera", label: "Pantera" },
    { value: "Direção", label: "Direção" },
    { value: "Diretoria", label: "Diretoria" },
  ];

  const estados = [{ value: "RN", label: "Rio Grande do Norte" }];

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Seção: Dados Pessoais */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">
            Dados Pessoais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <InputField
                type="text"
                placeholder="Nome Completo"
                value={formData.nome || ""}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
                icon={<User size={16} />}
              />
              {fieldErrors.nome && (
                <Message
                  message={fieldErrors.nome}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Idade */}
            <div>
              <InputField
                type="number"
                placeholder="Idade"
                value={formData.idade || ""}
                onChange={(e) => handleChange("idade", e.target.value)}
                required
                icon={<User size={16} />}
              />
              {fieldErrors.idade && (
                <Message
                  message={fieldErrors.idade}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* CPF */}
            <div>
              <InputField
                type="text"
                placeholder="CPF"
                value={formData.cpf || ""}
                onChange={(e) => handleChange("cpf", e.target.value)}
                required
                icon={<IdCard size={16} />}
              />
              {fieldErrors.cpf && (
                <Message
                  message={fieldErrors.cpf}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* RG */}
            <div>
              <InputField
                type="text"
                placeholder="RG"
                value={formData.rg || ""}
                onChange={(e) => handleChange("rg", e.target.value)}
                required
                icon={<IdCard size={16} />}
              />
              {fieldErrors.rg && (
                <Message
                  message={fieldErrors.rg}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>
          </div>
        </div>

        {/* Seção: Clube */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">
            Informações do Clube
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cargo */}
            <div>
              <SelectField
                value={formData.cargo || ""}
                onChange={(e) => handleChange("cargo", e.target.value)}
                options={cargos}
                placeholder="Selecione o cargo"
                required
                leftIcon={<Briefcase size={16} />}
                name="cargo"
              />
              {fieldErrors.cargo && (
                <Message
                  message={fieldErrors.cargo}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Unidade */}
            <div>
              <SelectField
                value={formData.unidade || ""}
                onChange={(e) => handleChange("unidade", e.target.value)}
                options={unidades}
                placeholder="Selecione a unidade"
                required
                leftIcon={<Users size={16} />}
                name="unidade"
              />
              {fieldErrors.unidade && (
                <Message
                  message={fieldErrors.unidade}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>
          </div>
        </div>

        {/* Seção: Responsável */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">
            Dados do Responsável
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome Responsável */}
            <div>
              <InputField
                type="text"
                placeholder="Nome do Responsável"
                value={formData.nomeResponsavel || ""}
                onChange={(e) =>
                  handleChange("nomeResponsavel", e.target.value)
                }
                required
                icon={<User size={16} />}
              />
              {fieldErrors.nomeResponsavel && (
                <Message
                  message={fieldErrors.nomeResponsavel}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Telefone Responsável */}
            <div>
              <InputField
                type="text"
                placeholder="Telefone do Responsável"
                value={formData.telefoneResponsavel || ""}
                onChange={(e) =>
                  handleChange("telefoneResponsavel", e.target.value)
                }
                required
                icon={<Phone size={16} />}
              />
              {fieldErrors.telefoneResponsavel && (
                <Message
                  message={fieldErrors.telefoneResponsavel}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>
          </div>
        </div>

        {/* Seção: Endereço */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">
            Endereço
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CEP */}
            <div>
              <InputField
                type="text"
                placeholder="CEP"
                value={formData.cep || ""}
                onChange={(e) => handleChange("cep", e.target.value)}
                required
                icon={<MapPin size={16} />}
              />
              {fieldErrors.cep && (
                <Message
                  message={fieldErrors.cep}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Rua */}
            <div>
              <InputField
                type="text"
                placeholder="Rua"
                value={formData.rua || ""}
                onChange={(e) => handleChange("rua", e.target.value)}
                required
                icon={<MapPin size={16} />}
              />
              {fieldErrors.rua && (
                <Message
                  message={fieldErrors.rua}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Número */}
            <div>
              <InputField
                type="number"
                placeholder="Número"
                value={formData.numero || ""}
                onChange={(e) => handleChange("numero", e.target.value)}
                required
                icon={<MapPin size={16} />}
              />
              {fieldErrors.numero && (
                <Message
                  message={fieldErrors.numero}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Bairro */}
            <div>
              <InputField
                type="text"
                placeholder="Bairro"
                value={formData.bairro || ""}
                onChange={(e) => handleChange("bairro", e.target.value)}
                required
                icon={<MapPin size={16} />}
              />
              {fieldErrors.bairro && (
                <Message
                  message={fieldErrors.bairro}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Cidade */}
            <div>
              <InputField
                type="text"
                placeholder="Cidade"
                value={formData.cidade || ""}
                onChange={(e) => handleChange("cidade", e.target.value)}
                required
                icon={<MapPin size={16} />}
              />
              {fieldErrors.cidade && (
                <Message
                  message={fieldErrors.cidade}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Estado */}
            <div>
              <SelectField
                value={formData.estado || ""}
                onChange={(e) => handleChange("estado", e.target.value)}
                options={estados}
                placeholder="Selecione o estado"
                required
                leftIcon={<MapPin size={16} />}
                name="estado"
              />
              {fieldErrors.estado && (
                <Message
                  message={fieldErrors.estado}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>
          </div>
        </div>

        {/* Seção: Observações */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">
            Observações
          </h3>
          <div>
            <textarea
              placeholder="Observações adicionais (opcional)"
              value={formData.observacao || ""}
              onChange={(e) => handleChange("observacao", e.target.value)}
              className="border-2 border-emerald-300 rounded-md w-full h-24 px-3 py-2 resize-none"
            />
            {fieldErrors.observacao && (
              <Message
                message={fieldErrors.observacao}
                variant="error"
                className="text-red-500 text-sm mt-1"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
