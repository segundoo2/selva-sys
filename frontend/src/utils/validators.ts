// utils/validators.ts
export const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const strongPasswordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

export function validateName(value: string) {
  if (!value?.trim()) return "O nome é obrigatório.";
  if (value.trim().length < 2) return "O nome deve ter no mínimo dois caracteres.";
  if (!nameRegex.test(value.trim())) return "O nome deve ter apenas letras e espaços.";
  return "";
}

export function validateEmail(value: string) {
  if (!value?.trim()) return "O e-mail é obrigatório.";
  if (!emailRegex.test(value.trim())) return "O formato de e-mail é inválido.";
  return "";
}

export function validateNivel(value: string) {
  if (!value) return "Selecione o nível de acesso.";
  return "";
}

export function validatePassword(value: string, options?: { required?: boolean }) {
  const required = options?.required ?? true;
  if (!value) {
    return required ? "A senha é obrigatória." : "";
  }
  if (value.length < 6) return "A senha deve ter entre seis a vinte caracteres.";
  if (!strongPasswordRegex.test(value)) return "A senha deve ter: letras maiúscula, minúscula, números e símbolos.";
  return "";
}

export function validateConfirmPassword(password: string, confirm: string, options?: { required?: boolean }) {
  const required = options?.required ?? true;
  if (required && !confirm) return "A confirmação da senha é obrigatória.";
  if (confirm && password !== confirm) return "As senhas não coincidem.";
  return "";
}
