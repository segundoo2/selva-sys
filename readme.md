# 📖 Documentação do SelvaSYS  

### João 3:16 Deus amou o mundo de tal maneira que deu seu único filho para todos que crerem Nele não se perca, mas tenha vida eterna.
---

**Versão:** 1.0.0
**Última atualização:** 05/02/2025

- **Analista de sistema:** Edilson Segundo
- **Design de interface:** Edilson Segundo
- **Design de experiência:** Edilson Segundo
- **Desenvolvedor front-end:** Edilson Segundo
- **Desenvolvedor back-end:** Edilson Segundo

---

## 1️⃣ Visão Geral  

### 1.1 O que é o SelvaSYS?  

O **SelvaSYS** é um **ERP especializado** para a gestão do **clube de desbravadores Reino Selvagem**, permitindo o gerenciamento integrado de **usuários, eventos, mensalidades, patrimônio e documentos**.  

### 1.2 Tecnologias Utilizadas  

**Desenvolvimento:**
- **Front-end:** Angular
- **Back-end:** NestJS + Prisma ORM  
- **Banco de Dados:** PostgreSQL

**Segurança:**
- Helmet
- JWT Service
- HTTPOnly Cookies

**Hospedagem:**  
  - **Frontend:** Vercel
  - **Backend:** Render  
  - **Banco de Dados:** Supabase  

---

## 2️⃣ Autenticação e Controle de Acesso  

### 2.1 Métodos de Autenticação  

- Login via **e-mail e senha**  
- Armazenamento seguro do **refresh token em HttpOnly cookies**  

### 2.2 Níveis de Acesso  

- **Admin:** Controle total do sistema  
- **Diretor:** Controle total do sistema, exceto cadastro de usuários  
- **Secretaria:** Administra documentos e registros  
- **Tesoureiro:** Controle financeiro  
- **Instrutor:** Gerencia especialidades e classes  
- **Conselheiro:** Acesso somente ao gerenciamento da unidade  

---

## 3️⃣ Gestão de Usuários (**somente o admin deve ter acesso.**)

### 3.1 Funcionalidades  

- ✅ Cadastro, edição e exclusão de usuários   
- ✅ Atribuição de níveis de acesso  
- ✅ Histórico de atividades do usuário  

---

## 4️⃣ Gestão de Membros do Clube  

### 4.1 Funcionalidades  

- ✅ Cadastro de desbravadores e vinculação a uma unidade  
- ✅ Histórico de especialidades e classes concluídas  
- ✅ Relatórios sobre progresso dos membros  

---

## 5️⃣ Gestão Financeira  

### 5.1 Controle de Mensalidades  

- ✅ Registro de mensalidades pagas e pendentes  
- ✅ Notificações automáticas via **WhatsApp** sobre pagamentos
- ✅ Relatórios financeiros detalhados  

### 5.2 Controle de Custos e Caixa  

- ✅ Registro de despesas e receitas do clube  
- ✅ Fluxo de caixa detalhado  
- ✅ Gráficos de análise financeira  

---

## 6️⃣ Gestão de Unidades, Classes e Especialidades  

### 6.1 Funcionalidades  

- ✅ Cadastro e gerenciamento de **unidades** do clube  
- ✅ Acompanhamento de **classes progressivas**  
- ✅ Relatórios sobre especialidades concluídas  

---

## 7️⃣ Gestão de Eventos e Saídas  

### 7.1 Funcionalidades  

- ✅ Cadastro de eventos e participantes  
- ✅ Relatórios de **autorização de saída** assinadas  
- ✅ Notificações via **WhatsApp** sobre eventos  

---

## 8️⃣ Gestão de Documentos  

### 8.1 Livro de Atas e Atos  

- ✅ Cadastro e consulta de atas de reuniões  
- ✅ Exportação de atas para PDF  

### 8.2 Relatórios de Autorizações de Saída  

- ✅ Registro de autorizações assinadas pelos responsáveis  
- ✅ Identificação de pendências  

---

## 9️⃣ Gestão de Patrimônio  

- ✅ Cadastro e rastreamento de bens do clube  
- ✅ Controle do estado de conservação e movimentação  
- ✅ Relatórios detalhados de patrimônio  

---

## 🔟 Relatórios e Dashboards  

**Relatórios disponíveis:**  
- ✔ Relatório de **unidades, classes e especialidades**  
- ✔ Relatório **financeiro** (mensalidades e fluxo de caixa)  
- ✔ Relatório de **eventos e autorizações de saída**  
- ✔ Relatório de **patrimônio e bens cadastrados**  

---

## 📡 Integrações e Automação  

- ✅ **WhatsApp:** Notificações automáticas  
- ✅ **API RESTful:** Integração com outros sistemas  
- ✅ **Exportação de dados** em PDF  

---

## 🛠 Futuras Melhorias  

- 🛠 **Dashboard interativo** com estatísticas do clube.
- 🛠 **Gestão de trilhas e acampamentos.**  
- 🛠 **Sistema de pontuação para gamificação.**
- 🛠 **Integração com o WhatsApp** para avisos aos membros.