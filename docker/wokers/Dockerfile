FROM node:22-bookworm-slim

WORKDIR /app

ENV OPEN_NEXT_RUNTIME=edge

COPY package*.json ./
RUN npm ci --include=optional --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run build:cloudflare && npx wrangler dev --local --ip 0.0.0.0 --port 3000"]
