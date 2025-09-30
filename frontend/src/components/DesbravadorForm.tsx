// components/DesbravadorForm.tsx
import {
  User,
  IdCard,
  Briefcase,
  Users,
  Phone,
  MapPin,
  Loader,
} from "lucide-react";
// IMPORTANTE: Adicionando useState, useEffect e useCallback
import React, { useEffect, useState, useCallback } from "react"; 
import InputField from "./InputField";
import Message from "./Message";
import SelectField from "./SelectField";

// IMPORTAÇÃO DAS FUNÇÕES DE MÁSCARA E BUSCA
import { maskCPF, maskPhone, maskCEP } from "../utils/masks";
import { fetchAddressByCep } from "../utils/cep"; 

export default function DesbravadorForm({
  formData,
  fieldErrors,
  // Assumimos que 'handleChange' é estável (vem de um useCallback no pai)
  handleChange, 
  isEditing,
}: any) {
  
  // ESTADOS LOCAIS PARA BUSCA DE CEP
  const [cepError, setCepError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  
  // Estado local para rastrear o valor do CEP para o Debounce
  const [debouncedCep, setDebouncedCep] = useState(formData.cep || ""); 
  
  // Sincroniza o estado local 'debouncedCep' com o estado global 'formData' ao carregar/editar
  useEffect(() => {
    setDebouncedCep(formData.cep || "");
  }, [formData.cep]);


  // Handler para MÁSCARAS (CPF e Telefone) - Estável com useCallback
  const handleMaskedChange = useCallback((field: string, maskFn: (v: string) => string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maskedValue = maskFn(e.target.value);
    handleChange(field, maskedValue);
  }, [handleChange]); 
  

  // Handler específico para o campo CEP - Estável com useCallback
  const handleCepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCEP(e.target.value);
    
    // 1. Atualiza o estado global (formData)
    handleChange("cep", maskedValue);
    
    // 2. ATUALIZA O ESTADO LOCAL de debounce
    setDebouncedCep(maskedValue);

    // 3. Limpa erro e carregamento *imediatamente* ao digitar
    if (cepError) setCepError(null);
    if (isLoadingCep) setIsLoadingCep(false);
  }, [handleChange, cepError, isLoadingCep]);


  // =======================================================================
  // EFEITO COM DEBOUNCE: Monitora o estado 'debouncedCep'
  // =======================================================================
  useEffect(() => {
    const cleanedCep = debouncedCep.replace(/\D/g, "");

    // Só prosseguimos se o CEP tiver exatamente 8 dígitos
    if (cleanedCep.length !== 8) {
        return;
    }
    
    // Define o tempo de espera (ex: 500ms)
    const delaySearch = setTimeout(() => {
        const loadAddress = async () => {
            setIsLoadingCep(true);
            
            const addressData = await fetchAddressByCep(cleanedCep);

            setIsLoadingCep(false); // Finaliza o carregamento

            if (addressData) {
                // Sucesso: Preenche os campos
                handleChange("rua", addressData.logradouro);
                handleChange("bairro", addressData.bairro);
                handleChange("cidade", addressData.localidade);
                handleChange("estado", addressData.uf);
            } else {
                // Falha: Exibe erro dinâmico
                setCepError("CEP não encontrado ou inválido.");
                
                // Limpar campos do endereço
                handleChange("rua", "");
                handleChange("bairro", "");
                handleChange("cidade", "");
                handleChange("estado", "");
            }
        };
        loadAddress();
    }, 500); // 500 milissegundos de debounce

    // Função de limpeza: cancela o timer se o usuário digitar novamente
    return () => clearTimeout(delaySearch);
    
  }, [debouncedCep, handleChange]); 

    
  // VARIÁVEL AUXILIAR: Verifica se o CEP digitado (limpo) tem 8 dígitos
  const isCepComplete = (formData.cep?.replace(/\D/g, "") || "").length === 8;

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

            {/* CPF - COM MÁSCARA */}
            <div>
              <InputField
                type="text"
                placeholder="CPF"
                value={formData.cpf || ""}
                onChange={handleMaskedChange("cpf", maskCPF)} 
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

            {/* RG - SEM MÁSCARA */}
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

            {/* Telefone Responsável - COM MÁSCARA */}
            <div>
              <InputField
                type="text"
                placeholder="Telefone do Responsável"
                value={formData.telefoneResponsavel || ""}
                onChange={handleMaskedChange("telefoneResponsavel", maskPhone)} 
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
            {/* CEP - COM CORREÇÃO FINAL NO ÍCONE */}
            <div>
              <InputField
                type="text"
                placeholder="CEP"
                value={formData.cep || ""}
                onChange={handleCepChange} 
                required
                // =======================================================================
                // CORREÇÃO FINAL: O Loader só aparece se (A) estiver carregando E (B) o CEP estiver completo
                // =======================================================================
                icon={
                    (isLoadingCep && isCepComplete) 
                        ? <Loader size={16} className="animate-spin text-emerald-600" /> 
                        : <MapPin size={16} />
                }
                disabled={isLoadingCep} 
              />
              {/* Exibe erro dinâmico da busca de CEP */}
              {(fieldErrors.cep || cepError) && (
                <Message
                  message={fieldErrors.cep || cepError}
                  variant="error"
                  className="text-red-500 text-sm mt-1"
                />
              )}
            </div>

            {/* Rua - Preenchimento automático */}
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

            {/* Bairro - Preenchimento automático */}
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

            {/* Cidade - Preenchimento automático */}
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

            {/* Estado - Preenchimento automático */}
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