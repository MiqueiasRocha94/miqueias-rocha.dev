# Convencoes de Codigo

## TypeScript e React
- Usar componentes funcionais.
- Nomear componentes em PascalCase.
- Manter props simples e tipadas.
- Evitar logica de negocio em componentes de UI.

## TailwindCSS
- Preferir classes utilitarias sobre CSS custom.
- Centralizar variaveis/temas em `globals.css` quando necessario.
- Evitar estilos inline quando houver alternativa utilitaria.

## Organizacao
- Componentes reutilizaveis em `src/components`.
- Contextos em `src/contexts`.
- Funcoes utilitarias em `src/lib`.
- Tipos compartilhados em `src/types`.
- Servicos de integracao em `src/services`.
- Configuracoes em `src/config`.

## I18n

- Manter chaves de tradução consistentes e nomeadas por domínio.
- Evitar hardcode de texto na UI quando houver suporte a i18n.

### Estrutura de arquivos

Os textos de cada idioma devem ser armazenados em:

public/locales/{idioma}/{idioma}.json

Exemplos:

public/locales/pt-BR/pt-BR.json  → idioma padrão  
public/locales/en-US/en-US.json  
public/locales/es-ES/es-ES.json

### Regras

- Todo novo texto deve ser adicionado primeiro no arquivo padrão `pt-BR.json`.
- Os demais idiomas devem seguir o mesmo conjunto de chaves.
- As pastas de idioma devem seguir o padrão de código BCP-47 (`pt-BR`, `en-US`, `es-ES`, etc).
- As chaves devem ser organizadas por domínio funcional (ex: `auth.login.title`, `vehicle.form.plate`).

## Logs (quando existirem no frontend)
- Usar mensagens em pt-BR.
- Evitar concatenacao, preferir templates simples.
- Evitar logs em producao quando nao forem essenciais.
