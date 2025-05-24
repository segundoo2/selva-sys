# Módulo Admin

O módulo **Admin** é responsável pela gestão de usuários administrativos do sistema SelvaSYS. Ele centraliza operações de criação, listagem, atualização, redefinição de senha e remoção de usuários, garantindo que apenas administradores autenticados e autorizados possam executar essas ações.

## Estrutura do Módulo

- **admin.controller.ts**: Define as rotas HTTP para operações administrativas, como criar, listar, atualizar, redefinir senha e deletar usuários. Todas as rotas são protegidas por guards de CSRF e de roles.
- **admin.service.ts**: Implementa a lógica de negócio para manipulação de usuários, incluindo hash de senhas com bcrypt e chamadas ao repositório.
- **admin.repository.ts**: Responsável pelo acesso ao banco de dados via Prisma, realizando operações CRUD e validações, como verificação de existência de usuário e unicidade de e-mail.
- **dto/**: Contém os Data Transfer Objects usados para validação e tipagem dos dados recebidos nas requisições:
  - **create-user.dto.ts**: Define os campos obrigatórios para criação de um novo usuário.
  - **update.dto.ts**: Define os campos opcionais para atualização de dados do usuário.
  - **resetPassword.dto.ts**: Define o campo necessário para redefinição de senha.

## Funcionalidades

- **Criação de Usuário**: Permite que administradores criem novos usuários, validando dados e garantindo unicidade de e-mail.
- **Listagem de Usuários**: Permite buscar todos os usuários, com filtro opcional por e-mail.
- **Atualização de Usuário**: Permite atualizar dados cadastrais e senha, sempre aplicando hash seguro na senha.
- **Redefinição de Senha**: Permite redefinir a senha de um usuário, aplicando hash seguro.
- **Remoção de Usuário**: Permite deletar usuários do sistema.
- **Proteção de Rotas**: Todas as rotas são protegidas por guards de CSRF e de roles, garantindo que apenas administradores autenticados possam realizar operações.

## Segurança

- **Guards**: Utiliza CsrfGuard e RolesGuard para proteger as rotas contra CSRF e garantir que apenas usuários com papel 'admin' possam acessar.
- **Bcrypt**: Todas as senhas são armazenadas de forma segura utilizando hash.
- **Validação**: Todos os dados recebidos são validados utilizando decorators do class-validator.

## Dependências

- **NestJS**: Framework principal.
- **Prisma**: ORM para acesso ao banco de dados.
- **bcrypt**: Para hash de senhas.
- **class-validator**: Para validação dos DTOs.

---

Este módulo é fundamental para a administração segura dos usuários do sistema, garantindo integridade, segurança e controle de acesso.
