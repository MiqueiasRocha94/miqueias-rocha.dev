# Arquitetura e Estrutura

## Estrutura principal
- `src/app`: rotas e layout (Next.js App Router).
- `src/components`: componentes UI reutilizaveis.
- `src/assets`: imagens, icones, fontes.
- `src/contexts`: providers de contexto.
- `src/services`: acesso a APIs e integracoes.
- `src/lib`: utilitarios e helpers.
- `src/models`: modelos locais (quando necessario).
- `src/types`: tipos compartilhados.
- `src/config`: configuracoes do app.
- `src/i18n.ts`: bootstrap de i18n.

## Regras de organizacao
- Rotas ficam sob `src/app` com pastas por feature.
- Componentes de pagina podem ficar em subpastas de `src/app`.
- Componentes genericos ficam em `src/components`.
- Evitar dependencia circular entre `components`, `services` e `lib`.

## Scripts principais
- `npm run dev`: desenvolvimento com Turbopack.
- `npm run build`: build de producao.
- `npm run build:cloudflare`: build para Cloudflare.
- `npm run deploy:cloudflare`: deploy via Wrangler.

## Deploy
- Usar OpenNext + Cloudflare quando o alvo for Cloudflare.
- Manter `open-next.config.ts` e `wrangler.toml` consistentes.
