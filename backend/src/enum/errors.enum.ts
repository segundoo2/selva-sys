export enum EErrors {
  INTERNAL_ERROR = 'Um erro interno foi detectado, por favor, tente novamente mais tarde.',
  USER_NOT_FOUND = 'Usuário não encontrado.',
  PASSWORD_REQUIRED = 'A senha é obrigatória.',
  ACCESS_DENIED = 'Acesso negado! Você não possui permissão para acessar esse módulo.',
  INVALID_CREDENTIALS = 'Credenciais inválidas.',
  NAME_INVALID = 'Nome inválido.',
  ACCESS_LEVEL = 'Nível de acesso é obrigatório.',
  EMPTY_FIELD = 'Campo obrigatório.',
  ROLE_INVALID = 'Nível de acesso inválido.',
  EMAIL_INVALID = 'Email inválido.',
  EMAIL_EXIST = 'Este email já está em uso.',
  PASSWORD_LENGTH = 'A senha deve ter de 6 a 20 caracter.',
  CSRF_INVALID = 'CSRF token inválido',
  ACCESS_TOKEN_INVALID = 'Token de acesso inválido.',
  REFRESH_TOKEN_INVALID = 'Refresh token inválido.',
  VERIFICATION_TOKEN = 'Verificação do token falhou.',
  ROLE_NOT_FOUND = 'Nível de acesso não encontrado.',
}
