# Decorator: Roles

Este arquivo implementa o decorator `@Roles`, utilizado para controle de acesso baseado em papéis (roles) no NestJS.

## Objetivo

Permitir que endpoints ou controladores definam, de forma declarativa, quais papéis de usuário têm permissão para acessar determinada rota. Isso facilita a implementação de regras de autorização e torna o código mais organizado e seguro.

## Funcionamento Técnico

- Utiliza o `SetMetadata` do NestJS para associar um array de roles ao handler ou controller.
- Os valores dos roles são armazenados na metadata sob a chave `'roles'`.
- O `RolesGuard` posteriormente lê essa metadata para validar se o usuário autenticado possui o papel necessário para acessar a rota.

## Exemplo de Uso

```typescript
@Roles('admin', 'manager')
@Get('usuarios')
findAll() {
  // Apenas usuários com role 'admin' ou 'manager' podem acessar
}
```

## Vantagens

- Permite controle granular de acesso baseado em papéis.
- Facilita a manutenção e leitura do código, centralizando a definição de permissões.
- Integra-se facilmente com guards personalizados para validação automática.

## Estrutura

- **ROLES_KEY**: Chave utilizada para armazenar os roles na metadata.
- **Roles**: Função decorator que recebe uma lista de roles permitidos e associa à rota ou controller.

---

Este decorator é fundamental para a segurança e organização do sistema, permitindo a implementação de políticas de acesso robustas e flexíveis.