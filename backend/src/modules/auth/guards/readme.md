# Guards do Módulo Auth

Esta pasta contém os guards responsáveis pela proteção das rotas de autenticação e autorização do sistema SelvaSYS. Cada guard implementa uma camada de segurança específica, garantindo que apenas usuários autorizados possam acessar determinados recursos.

---

## Arquivos

### 1. `access-token.guard.ts`

- **Função:** Garante que a requisição possua um token de acesso (JWT) válido no cookie `access_token`.
- **Como funciona:** 
  - Recupera o token do cookie.
  - Valida o token usando o `JwtService`.
  - Em caso de ausência ou invalidez do token, lança exceção de acesso proibido.
- **Uso típico:** Proteger rotas que exigem autenticação básica do usuário.

---

### 2. `csrf.guard.ts`

- **Função:** Protege rotas contra ataques CSRF (Cross-Site Request Forgery).
- **Como funciona:**
  - Recupera o token CSRF do header `x-csrf-token` ou do corpo da requisição.
  - Compara com o valor armazenado no cookie `csrf_token`.
  - Se os tokens não coincidirem ou estiverem ausentes, lança exceção de acesso proibido.
- **Uso típico:** Proteger endpoints sensíveis contra requisições forjadas.

---

### 3. `roles.guard.ts`

- **Função:** Controla o acesso a rotas com base nos papéis (roles) definidos para o usuário.
- **Como funciona:**
  - Lê os roles permitidos definidos pelo decorator `@Roles` na rota.
  - Recupera e valida o token JWT do cookie.
  - Verifica se o papel do usuário está entre os permitidos.
  - Lança exceção caso o usuário não tenha permissão.
- **Uso típico:** Proteger rotas administrativas ou de acesso restrito a determinados papéis.

---

## Integração

- Os guards podem ser usados individualmente ou em conjunto nas rotas, utilizando o decorator `@UseGuards`.
- Exemplo de uso:
  ```typescript
  @UseGuards(CsrfGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  createUser() { ... }
  ```

---

## Resumo

Esses guards são essenciais para garantir a segurança da aplicação, implementando autenticação, proteção contra CSRF e controle de acesso baseado em papéis de usuário.
