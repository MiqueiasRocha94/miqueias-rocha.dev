# ---------- Stage 1: Builder ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copia dependências
COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copia o restante do projeto
COPY . .

# Build da aplicação
RUN npm run build


EXPOSE 3000

CMD ["npx", "next", "start", "-H", "0.0.0.0"]
