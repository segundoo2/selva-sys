// utils/masks.ts

// Função auxiliar para remover todos os não-dígitos
const cleanValue = (value: string) => value.replace(/\D/g, "");

// Formata o valor como XXX.XXX.XXX-XX (CPF)
export const maskCPF = (value: string): string => {
  return cleanValue(value)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .substring(0, 14); 
};

// Formata o valor como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX (Telefone)
export const maskPhone = (value: string): string => {
  const cleaned = cleanValue(value);
  if (cleaned.length <= 10) {
    // Para 8 dígitos
    return cleaned
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 14); 
  } else {
    // Para 9 dígitos
    return cleaned
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15); 
  }
};

// NOVO: Formata o valor como XXXXX-XXX (CEP)
export const maskCEP = (value: string): string => {
    return cleanValue(value)
        .replace(/^(\d{5})(\d)/, "$1-$2")
        .substring(0, 9); // Limita a 9 caracteres (CEP formatado)
};