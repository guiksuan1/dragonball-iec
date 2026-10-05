# 🐉 Dragon Ball API - Integração e Entrega Contínua (IEC)

Projeto desenvolvido para a disciplina de **Integração e Entrega Contínua (IEC)**, utilizando o tema **Universo Dragon Ball**. Este repositório tem como foco a implementação de infraestrutura ágil, conteinerização de serviços, ferramentas de qualidade de código e automação de pipeline (CI/CD).

---

## 🛠 Tecnologias e Ferramentas

- **Linguagem & Backend:** Node.js com TypeScript, Express
- **Banco de Dados & ORM:** PostgreSQL, Sequelize
- **Conteinerização:** Docker e Docker Compose
- **Qualidade de Código:** ESLint e Prettier
- **Git Hooks:** Husky (validação local de *pre-commit*)
- **Integração Contínua (CI):** GitHub Actions

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) (ou npm)

---

## 🚀 Como Executar o Projeto (Local)

### 1. Clonar o repositório

```bash
git clone https://github.com/guiksuan1/dragonball-iec.git
cd dragonball-iec
```

### 2. Subir a Infraestrutura (Docker)

Neste projeto, tanto a API quanto o Banco de Dados PostgreSQL rodam em contêineres gerenciados pelo Docker Compose. Para iniciar a orquestração, execute na raiz do projeto:

```bash
docker compose up -d --build
```

Isso fará o build da imagem do backend e iniciará os dois serviços simultaneamente (API e Banco de Dados).

### 3. Testar a API

Assim que os contêineres estiverem rodando (verifique com `docker ps` ou na interface do Docker Desktop), a API já estará disponível respondendo na porta 3000:

👉 **`http://localhost:3000/api/personagens`**

---

## 🛡️ Esteira de Qualidade e CI/CD

### Husky (Bloqueio Local)

O projeto está configurado com o **Husky** para garantir que nenhum código com erro seja enviado para o repositório. Toda vez que você rodar um `git commit`, o Husky fará as seguintes validações automaticamente:

1. Formatação de código com Prettier.
2. Análise estática com ESLint.
3. Validação de tipagem do TypeScript (`tsc --noEmit`).

*Se houver erros (como quebras de tipagem), o commit será bloqueado imediatamente no seu terminal local.*

### GitHub Actions (Pipeline CI)

Ao enviar o código aprovado para o repositório (`git push`), o **GitHub Actions** dispara automaticamente a esteira de Integração Contínua (CI). O Workflow realiza as seguintes etapas em um ambiente Linux isolado:

- Checkout do código.
- Configuração do Node.js e instalação de dependências via `pnpm`.
- Execução do Linter (`pnpm lint`).
- Validação de Tipos (`pnpm typecheck`).
- Build da aplicação (`pnpm build`).

O status da esteira (Verde/Sucesso ou Vermelho/Falha) pode ser acompanhado diretamente na aba **Actions** do GitHub.

---

## 🎯 Endpoints da API

| Método | Rota | Descrição | Status Sucesso |
|---|---|---|---|
| **GET** | `/api/personagens` | Lista todos os guerreiros | `200 OK` |
| **GET** | `/api/personagens/:id` | Busca guerreiro por ID | `200 OK` |
| **POST** | `/api/personagens` | Cadastra um guerreiro | `201 Created` |
| **PUT** | `/api/personagens/:id` | Atualiza dados do guerreiro | `200 OK` |
| **DELETE** | `/api/personagens/:id` | Remove guerreiro pelo ID | `204 No Content` |
