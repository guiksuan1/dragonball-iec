# ==============================================================================
# Estágio 1: Builder (instala dependências, compila TypeScript e limpa devDeps)
# ==============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@12

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src

RUN pnpm run build
RUN pnpm prune --prod

# ==============================================================================
# Estágio 2: Runner (imagem enxuta de produção, usuário não-root)
# ==============================================================================
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
