# Projeto Angular

## 📌 Descrição

Este projeto foi desenvolvido utilizando Angular com o objetivo de criar uma aplicação web moderna, responsiva e organizada em componentes.

A aplicação utiliza roteamento, Angular Material e integração com uma API desenvolvida em PHP para disponibilizar projetos e tecnologias cadastrados em um banco de dados MariaDB.

O sistema possui páginas de Início, Sobre, Projetos e Contato, além de funcionalidades de autenticação e gerenciamento.

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
* Implementação de funcionalidades de login e gerenciamento.
* Tratamento de estados de carregamento, erro e conteúdo vazio nas telas que consomem a API.
* Uso do `AsyncPipe` para exibição dos dados recebidos da API.

---

## 🔐 Login e Gestão

O projeto possui uma área de login para acesso à gestão do portfólio. Após a autenticação, o usuário pode acessar o painel de gestão em `/gestao`.

No painel de gestão é possível:

* adicionar novos projetos;
* editar projetos existentes;
* excluir projetos;
* visualizar a lista de projetos cadastrados;
* atualizar a lista automaticamente após as alterações.

O formulário de criação e edição utiliza a mesma interface, diferenciando os modos por meio do estado `editandoId`. A gestão está concentrada no endereço `/gestao`, evitando a criação de páginas separadas para cada operação.

---

## 🛠️ Tecnologias Utilizadas

* Angular
* TypeScript
* HTML5
* CSS3
* Angular Material
* Node.js
* npm
* PHP
* MariaDB
* Git

---

## ⚙️ Ambiente de Desenvolvimento

| Ferramenta  | Versão  |
| ----------- | ------- |
| Node.js     | 24.14.0 |
| npm         | 11.19.0 |
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

## 🔌 API

O projeto possui uma API desenvolvida em PHP, responsável por consultar os dados armazenados no banco de dados MariaDB e disponibilizá-los para a aplicação Angular.

As respostas da API são fornecidas no formato JSON, com configuração de CORS e `Content-Type: application/json`.

### Endpoints

| Método | Endpoint               | Descrição                                   |
| ------ | ---------------------- | ------------------------------------------- |
| GET    | `/api/projetos.php`    | Retorna os projetos com status `publicado`. |
| GET    | `/api/tecnologias.php` | Retorna as tecnologias com status `ativo`.  |

Os dados retornados pelos endpoints são filtrados diretamente no banco de dados.

### Banco de dados

O arquivo `sql/setup.sql` contém os comandos necessários para:

* recriar o banco de dados `dwii_db`;
* criar o usuário do banco de dados;
* criar as tabelas `projetos`, `tecnologias`, `contatos` e `usuarios`;
* inserir dados iniciais de projetos e tecnologias.

### Execução da API e da aplicação

Na raiz do projeto, execute os comandos abaixo.

**1. Instale as dependências do Angular:**

```bash
npm install
```

**2. Inicie o servidor PHP:**

```bash
php -S localhost:8000
```

**3. Inicie o servidor de desenvolvimento Angular:**

```bash
ng serve
```

A API ficará disponível em:

```text
http://localhost:8000
```

A aplicação Angular ficará disponível em:

```text
http://localhost:4200
```

Os endpoints da API poderão ser acessados em:

```text
http://localhost:8000/api/projetos.php
http://localhost:8000/api/tecnologias.php
```

> Antes de iniciar a aplicação, configure o banco de dados MariaDB executando o arquivo `sql/setup.sql`. O servidor PHP deve ser iniciado na raiz do projeto, onde se encontra a pasta `api`.

---

## 📁 Estrutura do Projeto

```text
src/app/components  → Componentes da aplicação
src/app/services    → Serviços e comunicação com APIs
src/assets           → Arquivos estáticos
src/environments     → Configurações de ambiente
api                  → Endpoints da API em PHP
sql                  → Scripts de criação e configuração do banco
```

---

## 🧩 Gestão de Projetos

A área de gestão está disponível no endereço único `/gestao`, concentrando as operações de criação e edição de projetos em uma mesma interface.

A utilização de um único endereço evita a duplicação de páginas e mantém o gerenciamento centralizado. O comportamento do formulário é definido pelo estado `editandoId`: quando não há um ID selecionado, o formulário é utilizado para adicionar um projeto; quando há um ID, o mesmo formulário passa a editar o projeto correspondente.

Após o salvamento, o formulário é limpo, retorna ao modo de adição e a lista de projetos é atualizada automaticamente, sem necessidade de recarregar a página.

---

## 🎯 Autoavaliação

**Conceito pretendido: A**

**Justificativa:**

* **Consumo da API — Projetos:** a tela de projetos utiliza o `ProjetoService` para realizar a requisição à API. Em `projetos.ts`, os dados são obtidos por meio de `this.service.listar()` e exibidos com `AsyncPipe`. Em `projetos.html`, os projetos são apresentados utilizando `@for`.

* **Estados da tela Projetos:** `projetos.ts` utiliza `catchError()` para tratar falhas na requisição e `finalize()` para controlar o estado de carregamento. Em `projetos.html`, são apresentados os estados de carregamento, erro e vazio, incluindo a mensagem quando não existem projetos publicados.

* **Catálogo:** a tela `catalogo.ts` utiliza o service para obter as tecnologias e o `AsyncPipe` para exibi-las. Em `catalogo.html`, os dados são apresentados com `@for`, com tratamento para carregamento e catálogo vazio.

* **Botão GitHub:** em `projetos.html`, o botão "Ver no GitHub" utiliza property binding com `[href]="p.link_github"`, direcionando para o endereço do projeto quando disponível.

* **Boas práticas Angular:** o acesso aos dados e as requisições HTTP ficam concentrados nos services, enquanto os componentes ficam responsáveis pela apresentação dos dados e pelo controle dos estados da interface. Essa organização facilita a manutenção e evita a duplicação da lógica de acesso à API.

* **Iniciativa própria:** foram implementados estados vazios nas telas de Projetos e Catálogo e utilizado o `AsyncPipe`, evitando a necessidade de `subscribe()` direto nos componentes para a exibição dos dados.

* **Autoavaliação:** esta seção do `README.md` apresenta o conceito pretendido e relaciona cada critério aos arquivos responsáveis pela implementação.

---

## 👤 Autor

Projeto desenvolvido por Yasmin Lara Amanajás de Miranda para fins acadêmicos.
