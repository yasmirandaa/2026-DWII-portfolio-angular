# Projeto Angular

## 📌 Descrição

Este projeto foi desenvolvido utilizando Angular com o objetivo de criar uma aplicação web moderna, responsiva e organizada em componentes.

A aplicação utiliza roteamento, Angular Material e integração com APIs para disponibilizar projetos e tecnologias cadastrados em um banco de dados MariaDB.

O sistema possui páginas de Início, Sobre, Projetos e Contato, além de funcionalidades de autenticação e gerenciamento de projetos.

---

## ⭐ Funcionalidades

### Nível C

* Criação das páginas: Início, Sobre, Projetos e Contato.
* Configuração de rotas com Angular Router.
* Barra de navegação funcional com Angular Material.
* Uso de `mat-card` nas páginas Início e Sobre.

### Nível B

* Ampliação do conteúdo das páginas Início e Sobre.
* Destaque da página ativa no menu com `routerLinkActive`.
* Melhor organização visual das páginas.
* Atualização da documentação do projeto.
* Integração com API em PHP.
* Consulta de projetos e tecnologias cadastrados no banco de dados.

### Nível A

* Conteúdo completo nas páginas Projetos e Contato.
* Interface com melhorias visuais.
* Estrutura preparada para futuras funcionalidades.
* Organização do portfólio com foco profissional.
* Integração com banco de dados MariaDB.
* Implementação de login e gerenciamento de projetos.
* Tratamento de estados de carregamento, erro e conteúdo vazio nas telas que consomem a API.
* Uso do `AsyncPipe` para exibição dos dados recebidos da API.

---

## 🔐 Login e Gestão

O projeto possui uma área de login para acesso à gestão do portfólio. Após a autenticação, o usuário pode acessar o painel de gestão em `/gestao`.

No painel de gestão é possível:

* Adicionar novos projetos.
* Editar projetos existentes.
* Excluir projetos.
* Visualizar a lista de projetos cadastrados.
* Atualizar a lista automaticamente após as alterações.

O formulário de criação e edição utiliza a mesma interface, diferenciando os modos por meio do estado `editandoId`.

A API Node.js utiliza autenticação com senha criptografada por bcrypt e tokens JWT. As operações de criação, edição e exclusão exigem autenticação.

---

## 🛠️ Tecnologias Utilizadas

* Angular
* TypeScript
* HTML5
* CSS3
* Angular Material
* Node.js
* Express
* bcrypt
* JSON Web Token (JWT)
* npm
* PHP
* MariaDB
* Git

---

## ⚙️ Ambiente de Desenvolvimento

| Ferramenta | Versão |
|---|---|
| Node.js | 24.14.0 |
| npm | 11.19.0 |
| Angular CLI | 21.2.21 |

---

## 📥 Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências do Angular:

```bash
npm install
```

---

## 🔌 APIs

O projeto possui duas implementações de API:

* **API PHP:** utilizada para consultas de projetos e tecnologias, mantida como parte do desenvolvimento anterior.
* **API Node.js:** utilizada na implementação de autenticação e operações de gerenciamento de projetos.

### API PHP

Os endpoints PHP estão localizados na pasta `api/`.

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/projetos.php` | Retorna projetos com status `publicado`. |
| GET | `/api/tecnologias.php` | Retorna tecnologias com status `ativo`. |

Os dados são consultados no MariaDB e retornados no formato JSON.

### API Node.js

A API Node.js está localizada na pasta `api-node/` e utiliza Express, MariaDB e JWT.

| Método | Endpoint | Autenticação | Descrição |
|---|---|---|---|
| POST | `/api/login` | Não | Realiza o login e retorna um token JWT. |
| GET | `/api/projetos` | Não | Lista os projetos publicados. |
| GET | `/api/projetos/:id` | Não | Consulta um projeto pelo ID. |
| POST | `/api/projetos` | Sim | Cadastra um projeto. |
| PUT | `/api/projetos/:id` | Sim | Atualiza um projeto. |
| DELETE | `/api/projetos/:id` | Sim | Exclui um projeto. |

As rotas de escrita utilizam o middleware `autenticar`, que verifica o token JWT enviado no cabeçalho `Authorization`.

### Banco de dados

O arquivo `sql/setup.sql` contém os comandos para configurar o banco de dados `dwii_db` e suas tabelas.

A API Node.js utiliza a tabela `usuario`, que armazena o e-mail e o hash da senha. As senhas são protegidas com bcrypt.

As credenciais e configurações locais devem ser mantidas em um arquivo `.env`, que não deve ser enviado ao GitHub.

### Execução da API Node.js

Acesse a pasta:

```bash
cd api-node
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente necessárias no arquivo `.env`, conforme o modelo `.env.example`.

Inicie a API:

```bash
node server.js
```

A API ficará disponível em:

```text
http://localhost:3000
```

### Execução da API PHP

Na raiz do projeto, execute:

```bash
php -S localhost:8000
```

A API PHP ficará disponível em:

```text
http://localhost:8000
```

### Execução do Angular

Em outro terminal, na raiz do projeto:

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

---

## 🧪 Testes da API Node.js

Foram realizados testes utilizando `curl` para verificar o funcionamento das rotas públicas e protegidas.

### 1. Login

Requisição:

```bash
curl -i -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"teste@portfolio.dev","senha":"SENHA_DE_TESTE"}'
```

Resposta obtida:

```http
HTTP/1.1 200 OK
```

A resposta JSON contém o token JWT utilizado para autenticar as operações protegidas.

### 2. Listagem pública de projetos

Requisição:

```bash
curl -i http://localhost:3000/api/projetos
```

Resposta obtida:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

A API retornou a lista de projetos publicados sem exigir token.

### 3. Cadastro sem autenticação

Requisição:

```bash
curl -i -X POST http://localhost:3000/api/projetos \
-H "Content-Type: application/json" \
-d '{"nome":"Teste sem token","descricao":"Teste de proteção","tecnologias":"Node.js","ano":2026}'
```

Resposta obtida:

```http
HTTP/1.1 401 Unauthorized
```

```json
{"erro":"Token ausente"}
```

O cadastro foi bloqueado porque a requisição não possuía token.

### 4. Cadastro com autenticação

Requisição:

```bash
curl -i -X POST http://localhost:3000/api/projetos \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN" \
-d '{"nome":"Projeto de autenticação","descricao":"Teste de cadastro protegido","tecnologias":"Node.js","ano":2026}'
```

Resposta obtida:

```http
HTTP/1.1 201 Created
```

```json
{"id":17}
```

O projeto foi cadastrado com sucesso.

### 5. Edição com autenticação

Requisição:

```bash
curl -i -X PUT http://localhost:3000/api/projetos/17 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN" \
-d '{"nome":"Projeto de autenticação editado","descricao":"Teste de edição protegida","tecnologias":"Node.js, Express","ano":2026}'
```

Resposta obtida:

```http
HTTP/1.1 200 OK
```

```json
{"mensagem":"Projeto atualizado"}
```

O projeto foi atualizado com sucesso.

### 6. Exclusão com autenticação

Requisição:

```bash
curl -i -X DELETE http://localhost:3000/api/projetos/17 \
-H "Authorization: Bearer SEU_TOKEN"
```

Resposta obtida:

```http
HTTP/1.1 204 No Content
```

O projeto foi excluído com sucesso.

### Resumo dos testes

| Operação | Resultado |
|---|---|
| Login | 200 OK |
| Listagem pública | 200 OK |
| Cadastro sem token | 401 Unauthorized |
| Cadastro com token | 201 Created |
| Edição com token | 200 OK |
| Exclusão com token | 204 No Content |

Os testes confirmaram que a listagem é pública e que as operações de criação, edição e exclusão exigem autenticação.

---

## 📁 Estrutura do Projeto

```text
src/
  app/
    components/       → Componentes da aplicação
    services/         → Serviços e comunicação com APIs
  assets/             → Arquivos estáticos
  environments/       → Configurações de ambiente

api/                  → Endpoints em PHP
api-node/             → API Node.js e autenticação
sql/                  → Scripts do banco de dados
portfolio-react/      → Projeto desenvolvido em React
```

---

## 🧩 Gestão de Projetos

A área de gestão está disponível no endereço único `/gestao`, concentrando as operações de criação e edição de projetos em uma mesma interface.

O comportamento do formulário é definido pelo estado `editandoId`: quando não há um ID selecionado, o formulário é utilizado para adicionar um projeto; quando há um ID, o mesmo formulário passa a editar o projeto correspondente.

Após o salvamento, o formulário é limpo, retorna ao modo de adição e a lista de projetos é atualizada automaticamente, sem necessidade de recarregar a página.

---

## 🎯 Autoavaliação

**Conceito pretendido: A**

**Justificativa:**

* **Consumo da API — Projetos:** a tela de projetos utiliza o `ProjetoService` para realizar a requisição à API. Em `projetos.ts`, os dados são obtidos por meio de `this.service.listar()` e exibidos com `AsyncPipe`. Em `projetos.html`, os projetos são apresentados utilizando `@for`.

* **Estados da tela Projetos:** `projetos.ts` utiliza `catchError()` para tratar falhas na requisição e `finalize()` para controlar o estado de carregamento. Em `projetos.html`, são apresentados os estados de carregamento, erro e vazio.

* **Catálogo:** a tela `catalogo.ts` utiliza o service para obter as tecnologias e o `AsyncPipe` para exibi-las. Em `catalogo.html`, os dados são apresentados utilizando `@for`, com tratamento para carregamento e catálogo vazio.

* **Botão GitHub:** em `projetos.html`, o botão "Ver no GitHub" utiliza property binding com `[href]="p.link_github"`.

* **Boas práticas Angular:** o acesso aos dados e as requisições HTTP ficam concentrados nos services, enquanto os componentes ficam responsáveis pela apresentação dos dados e pelo controle dos estados da interface.

* **Autenticação e segurança:** a API Node.js utiliza bcrypt para verificar senhas e JWT para autenticar as operações protegidas. A listagem de projetos é pública, enquanto as rotas de criação, edição e exclusão exigem token.

* **Iniciativa própria:** foram implementados estados vazios nas telas de Projetos e Catálogo e utilizado o `AsyncPipe`, evitando a necessidade de `subscribe()` direto nos componentes para a exibição dos dados.

* **Autoavaliação:** esta seção apresenta o conceito pretendido e relaciona os critérios às funcionalidades implementadas.

---

## 👤 Autor

Projeto desenvolvido por Yasmin Lara Amanajás de Miranda para fins acadêmicos.

---

## 📚 Histórico de desenvolvimento

### Aula 23: API de criação, edição e exclusão

Implementação das operações de cadastro, atualização e exclusão de projetos por meio da API Node.js.

### Aula 24: Autenticação

Implementação de login com bcrypt e JWT, além da proteção das rotas responsáveis pela escrita dos dados.

### Aula 25: Portfólio em React

Criação do projeto `portfolio-react/`, utilizando Vite e React, como uma nova implementação de interface.

### Aula 26: Estado, lista e formulário

Os projetos foram organizados em `src/projetos.js` e apresentados utilizando `map`. O formulário de contato utiliza `useState` para controlar os dados digitados.

### Aula 27: os projetos vem da API

O front busca os projetos e o catalogo na API em Node, com `fetch` dentro de um `useEffect` O endereco da API fica em `src/api.js. O arquivo "src/projetos.js saiu: os dados moram no banco.

Para a tela mostrar os dados, a API precisa estar de pe, com a porta 3000 em Public:

      sudo service mariadb start
      cd api-node
      node server.js