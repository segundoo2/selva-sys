# Selva Sys Backend

Este é o backend do projeto Selva Sys, desenvolvido com [NestJS](https://nestjs.com/) e [Prisma](https://www.prisma.io/).

## Requisitos

- Node.js
- PostgreSQL

## Configuração

1. Clone o repositório:

  ```bash
  git clone <URL_DO_REPOSITORIO>
  cd backend
  ```

2. Instale as dependências:

  ```bash
  npm install
  ```

3. Configure as variáveis de ambiente:
  Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example` e preencha as variáveis necessárias.

4. Execute as migrações do Prisma:

  ```bash
  npx prisma migrate dev
  ```

## Scripts Disponíveis

- `npm run start`: Inicia a aplicação.
- `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação.
- `npm run test`: Executa os testes.
- `npm run test:e2e`: Executa os testes end-to-end.
- `npm run lint`: Executa o linter.

## Estrutura do Projeto

- `src/`: Contém o código fonte da aplicação.
- `prisma/`: Contém o esquema do Prisma e as migrações.
- `test/`: Contém os testes end-to-end.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/): Framework para construção de aplicações Node.js escaláveis.
- [Prisma](https://www.prisma.io/): ORM para Node.js e TypeScript.
- [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT.

## Autoria

Desenvolvido por: Edilson Segundo
