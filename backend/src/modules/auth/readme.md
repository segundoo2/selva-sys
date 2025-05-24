# Auth Module

O módulo **Auth** é responsável pela autenticação e autorização de usuários no sistema SelvaSYS. Ele centraliza toda a lógica de login, validação de sessão, geração e renovação de tokens JWT, além de proteger rotas sensíveis utilizando guards e decorators personalizados.

## Estrutura do Módulo

- **auth.controller.ts**: Define as rotas de autenticação, como login, validação de sessão e refresh de tokens.
- **auth.service.ts**: Contém a lógica de autenticação, validação de credenciais, geração de tokens JWT, criação de cookies e renovação de tokens.
- **auth.repository.ts**: Responsável por buscar informações do usuário no banco de dados durante o processo de autenticação.
- **dto/auth.dto.ts**: Define o formato dos dados de entrada para login (email e senha).
- **guards/**: Implementa mecanismos de proteção das rotas:
  - **access-token.guard.ts**: Valida o token de acesso (JWT).
  - **csrf.guard.ts**: Protege contra ataques CSRF validando o token CSRF.
  - **roles.guard.ts**: Garante que apenas usuários com o papel adequado acessem determinadas rotas.
- **decorators/role.decorator.ts**: Permite definir, via decorator, quais roles podem acessar cada rota.

## Funcionalidades

- **Login**: Valida as credenciais do usuário, gera tokens de acesso e refresh, e define cookies seguros.
- **Validação de Sessão**: Verifica se o token de acesso do usuário é válido.
- **Renovação de Tokens**: Permite renovar o token de acesso utilizando um token de refresh válido e um token CSRF.
- **Proteção de Rotas**: Utiliza guards para garantir que apenas usuários autenticados e autorizados acessem recursos sensíveis.

## Segurança

- **JWT**: Utilizado para autenticação baseada em tokens.
- **Cookies Seguros**: Tokens são armazenados em cookies HTTP-only e com SameSite.
- **CSRF**: Implementação de proteção contra CSRF nas rotas sensíveis.
- **Bcrypt**: Senhas dos usuários são armazenadas de forma segura utilizando hash.

## Dependências

- **NestJS**: Framework principal.
- **Prisma**: ORM para acesso ao banco de dados.
- **jsonwebtoken**: Geração e validação de tokens JWT.
- **bcrypt**: Hash de senhas.
- **class-validator**: Validação dos DTOs.

---

Este módulo é fundamental para garantir a segurança e o controle de acesso em toda a aplicação.
