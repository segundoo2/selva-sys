# SelvaSYS

Este repositório contém o frontend e o backend do projeto SelvaSYS, uma aplicação web desenvolvida com Angular e NestJS.

## Sobre o SelvaSYS

O SelvaSYS é um projeto voluntário feito para o clube de desbravadores da Igreja Adventista do Sétimo Dia de Planalto 1 do município de Natal-RN, Reino Selvagem. O projeto trata-se de um sistema ERP que auxília na gestão do clube Reino Selvagem como um todo. Nele é possível administrar os membros do clube, unidades, classes, especialidades, secretária, finanças, patrimônio, eventos e ranking de unidades. Além disso o SelvaSYS contém um módulo exclusivo para o administrador do sistema (que será o próprio desenvolvedor), para administrar os usuários dele. Cada usuário acessará o sistema com o email e senha cadastrado e terá um nível de acesso que controlará quais módulos ele poderá acessar.

### Níveis de Acesso

- **Admin:** Acesso total ao sistema.
- **Diretor:** Acesso total ao sistema, exceto o painel de usuário.
- **Secretário:** Acesso aos módulos membros, unidades, secretaria, finanças e patrimônio.
- **Tesoureiro:** Acesso aos módulos de finanças e patrimônio.
- **Instrutor:** Acesso aos módulos de classes, especialidades e ranking de unidades.
- **Conselheiro:** Acesso aos módulos de unidades e ranking de unidades.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- **frontend**: Contém o código fonte do frontend da aplicação.
  - **src/app**: Contém os componentes principais da aplicação.
    - **app.component.ts**: Componente principal da aplicação.
    - **app.module.ts**: Módulo principal da aplicação.
    - **app-routing.module.ts**: Configuração das rotas da aplicação.
    - **modules**: Módulos específicos da aplicação.
      - **login**: Módulo de login.
        - **form-login**: Componente de formulário de login.
    - **shared**: Módulos e componentes compartilhados.
      - **components**: Componentes compartilhados como header e footer.
    - **core**: Serviços e interceptores principais.
      - **services**: Serviços como AuthService.
      - **interceptors**: Interceptores como CsrfInterceptor.
      - **guards**: Guards como AuthGuard.
  - **assets**: Contém os arquivos estáticos como imagens e estilos globais.
  - **styles.scss**: Arquivo principal de estilos.

- **backend**: Contém o código fonte do backend da aplicação.
  - **src**: Contém o código fonte da aplicação.
    - **modules**: Módulos da aplicação.
      - **admin**: Módulo de administração.
      - **auth**: Módulo de autenticação.
    - **enum**: Contém enums utilizados na aplicação.
    - **interface**: Contém interfaces utilizadas na aplicação.
    - **util**: Contém utilitários utilizados na aplicação.
    - **app.module.ts**: Módulo principal da aplicação.
    - **main.ts**: Arquivo principal para iniciar a aplicação.
  - **prisma**: Contém o esquema do Prisma e as migrações.
  - **test**: Contém os testes end-to-end.

## Dependências

As principais dependências do projeto incluem:

- **Frontend**:
  - Angular
  - Axios
  - RxJS

- **Backend**:
  - NestJS
  - Prisma
  - PostgreSQL

## Scripts Disponíveis

No arquivo `package.json`, os seguintes scripts estão disponíveis:

- **Frontend**:
  - `start`: Inicia a aplicação em modo de desenvolvimento.
  - `build`: Compila a aplicação para produção.
  - `test`: Executa os testes unitários.

- **Backend**:
  - `start`: Inicia a aplicação.
  - `start:dev`: Inicia a aplicação em modo de desenvolvimento.
  - `build`: Compila a aplicação.
  - `test`: Executa os testes.
  - `test:e2e`: Executa os testes end-to-end.
  - `lint`: Executa o linter.

## Configurações do VSCode

O projeto inclui configurações específicas para o VSCode:

- **extensions.json**: Recomendações de extensões.
- **launch.json**: Configurações de lançamento para depuração.
- **tasks.json**: Tarefas automatizadas.

## Estilos

Os estilos são definidos utilizando SCSS e estão localizados em `src/styles.scss` e nos arquivos de estilo específicos dos componentes.

## Configuração do TypeScript

As configurações do TypeScript estão definidas nos arquivos `tsconfig.json`, `tsconfig.app.json` e `tsconfig.spec.json`.

## EditorConfig

O projeto inclui um arquivo `.editorconfig` para manter a consistência de estilo de código entre diferentes editores.

## Gitignore

O arquivo `.gitignore` está configurado para ignorar arquivos e diretórios desnecessários, como `node_modules` e arquivos de log.

## Como Executar

Para executar o projeto localmente, siga os passos abaixo:

### Frontend

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie a aplicação:

   ```bash
   npm start
   ```

3. Acesse a aplicação em `http://localhost:4200`.

### Backend

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example` e preencha as variáveis necessárias.

3. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Inicie a aplicação:

   ```bash
   npm run start:dev
   ```

## Autor

Desenvolvido por: Edilson Segundo.
