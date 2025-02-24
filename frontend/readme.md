# SelvaSYS Frontend

Este é o projeto frontend do SelvaSYS, uma aplicação web desenvolvida com Angular.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

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

## Dependências

As principais dependências do projeto incluem:

- Angular
- Axios
- RxJS

## Scripts Disponíveis

No arquivo `package.json`, os seguintes scripts estão disponíveis:

- `start`: Inicia a aplicação em modo de desenvolvimento.
- `build`: Compila a aplicação para produção.
- `test`: Executa os testes unitários.

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

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie a aplicação:

   ```bash
   npm start
   ```

3. Acesse a aplicação em `http://localhost:4200`.

## Autor

Desenvolvido por Edilson Segundo.
