# 🐉 Dragon Ball API — AT2 de IEC (Docker, GitHub Actions & Render)

Projeto de backend desenvolvido para a **AT2 da disciplina IEC (Integração e Entrega Contínua)** da FATEC, implementando uma esteira completa de **CI/CD** com **Node.js, Express 5, TypeScript, Sequelize, PostgreSQL (Supabase), Docker, GitHub Actions** e **Deploy Contínuo no Render via Webhook**.

---

## 🌐 API em Produção (Render)

> ⚠️ **Atualize o link abaixo após criar o Web Service no Render:**

- **URL Base:** `https://SEU-SERVICO.onrender.com`
- **Health Check:** `https://SEU-SERVICO.onrender.com/api/health`
- **Personagens (CRUD):** `https://SEU-SERVICO.onrender.com/api/personagens`
- **Documentação Swagger:** `https://SEU-SERVICO.onrender.com/api-docs`

---

## 🗂 Estrutura do Repositório

```text
dragonball-iec/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD (CI + Docker Build + Deploy Hook Render)
├── backend/
│   ├── src/
│   │   ├── config/             # Conexão PostgreSQL/SSL e Swagger
│   │   ├── controllers/        # Regras de negócio CRUD
│   │   ├── migrations/         # Migrations Sequelize
│   │   ├── models/             # Modelo Personagem
│   │   ├── routes/             # Rotas /api/personagens
│   │   └── server.ts           # Servidor Express + /api/health
│   ├── Dockerfile              # Build multi-stage (node:24-alpine)
│   ├── .dockerignore
│   └── .env.example
├── docker-compose.yml          # PostgreSQL local (opcional)
└── README.md
```

---

## ⚙️ Esteira de CI/CD (GitHub Actions)

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) é disparado automaticamente em todo `push` na branch `main`:

1. **Integração Contínua (CI):** instala dependências (`pnpm install --frozen-lockfile`), executa checagem estática de tipos (`tsc --noEmit`) e compila o projeto TypeScript (`pnpm run build`).
2. **Validação de Contêiner (CD):** executa `docker build -t dragonball-api:ci ./backend` para validar a imagem Docker de produção.
3. **Implantação Contínua no Render:** apenas se as etapas anteriores passarem, dispara o Deploy Hook via `curl -X POST` usando o segredo `RENDER_DEPLOY_HOOK_URL` (com **Auto-Deploy** desativado no Render) e valida retorno HTTP `200`/`201`.

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório e instalar dependências
```bash
git clone https://github.com/guiksuan1/dragonball-iec.git
cd dragonball-iec/backend
pnpm install
```

### 2. Configurar variáveis de ambiente
Crie `backend/.env` com base em `backend/.env.example`:
```env
PORT=3000
DB_HOST=seu-host.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.seu-projeto
DB_PASSWORD=SUA_SENHA_AQUI
DB_DIALECT=postgres
DB_SSL=true
```
*(Use `DB_SSL=false` caso utilize PostgreSQL local via `docker-compose.yml`.)*

### 3. Executar em modo de desenvolvimento
```bash
pnpm dev
```
A API estará disponível em `http://localhost:3000` (Health Check em `/api/health` e Swagger em `/api-docs`).

---

## 🐳 Execução com Docker

A partir da raiz do repositório:
```bash
docker build -t dragonball-api ./backend
docker run --env-file ./backend/.env -p 3000:3000 dragonball-api
```

---

## 🎯 Endpoints da API

| Método | Rota | Descrição | Status Sucesso |
|---|---|---|---|
| **GET** | `/api/health` | Verificação de integridade (Health Check) | `200 OK` |
| **GET** | `/api-docs` | Documentação interativa Swagger UI | `200 OK` |
| **GET** | `/api/personagens` | Lista todos os guerreiros | `200 OK` |
| **GET** | `/api/personagens/:id` | Busca guerreiro por ID | `200 OK` |
| **POST** | `/api/personagens` | Cadastra um guerreiro | `201 Created` |
| **PUT** | `/api/personagens/:id` | Atualiza dados do guerreiro | `200 OK` |
| **DELETE** | `/api/personagens/:id` | Remove guerreiro pelo ID | `204 No Content` |
