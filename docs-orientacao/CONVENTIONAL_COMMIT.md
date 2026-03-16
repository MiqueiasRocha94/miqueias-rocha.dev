# Guia de Mensagens de Commit (Conventional Commit)

## Objetivo
Garantir mensagens de commit **claras, concisas e padronizadas**, facilitando o entendimento do histórico do projeto e automatizando processos de versionamento.

---

## Estrutura Recomendada
``` html
<tipo>: <emoji> <mensagem principal>
```
Exemplo:

feat: ✨ adicionar endpoint de cadastro de cliente

- **<tipo>**: Define a categoria da alteração (veja lista abaixo).
- **<emoji>**: Ajuda a identificar visualmente o tipo de commit.
- **<mensagem principal>**: Descreve de forma objetiva a alteração feita.
- **Bullet points (-)**: Devem ser usados no corpo da mensagem quando houver múltiplas alterações relevantes.

---

## Tipos Comuns e Emojis Recomendados

| Tipo       | Emoji | Descrição                                                        |
|-----------|-------|------------------------------------------------------------------|
| **feat**  | ✨    | Adição de um **novo recurso**.                                   |
| **fix**   | 🐛    | Correção de **bug** ou comportamento inesperado.                |
| **hotfix**| 🚑    | Correção **urgente em produção**.                                |
| **refactor** | ♻️ | Refatoração de código que **não altera funcionalidade**.        |
| **chore** | 🔧    | Tarefas de manutenção, como alterações de configuração ou scripts auxiliares. |
| **test**  | ✅    | Criação ou atualização de **testes** automatizados.              |
| **docs**  | 📝    | Alterações na **documentação**.                                  |
| **style** | 🎨    | Mudanças **visuais** ou de **formatação** (espaços, indentação). |
| **perf**  | ⚡    | Melhorias de **performance**.                                    |
| **ci**    | 🤖    | Alterações em configuração de **CI/CD** (GitHub Actions, Jenkins).|
| **build** | 🏗️    | Alterações que afetam o **processo de build** (ex: pom.xml, Dockerfile). |
| **BREAKING CHANGE** | 💥 | Indica alteração que **quebra compatibilidade** ou exige **ajustes manuais** no uso do sistema. |
---

## 📖 Explicação Detalhada de Cada Tipo

- **feat** ✨  
  Use para *qualquer nova funcionalidade* ou endpoint.  
  **Exemplo:** `feat: ✨ adicionar endpoint de autenticação via token JWT`

- **fix** 🐛  
  Use para correções de problemas reportados.  
  **Exemplo:** `fix: 🐛 corrigir cálculo de imposto quando valor é zero`

- **hotfix** 🚑  
  Use exclusivamente para correções críticas em **produção**, que precisam ser aplicadas rapidamente.  
  **Exemplo:** `hotfix: 🚑 corrigir erro em endpoint de pagamento em produção`

- **refactor** ♻️  
  Use quando houver melhorias na estrutura do código sem alterar o comportamento.  
  **Exemplo:** `refactor: ♻️ extrair lógica de validação para classe utilitária`

- **chore** 🔧  
  Para tarefas de manutenção ou melhorias de ambiente.  
  **Exemplo:** `chore: 🔧 atualizar dependências do Spring Boot`

- **test** ✅  
  Para criação ou melhoria de testes automatizados.  
  **Exemplo:** `test: ✅ adicionar testes unitários para serviço de usuários`

- **docs** 📝  
  Para alterações na documentação (README, Swagger, JavaDoc).  
  **Exemplo:** `docs: 📝 documentar fluxo de autenticação no README`

- **style** 🎨  
  Para ajustes que não alteram comportamento, apenas formatação.  
  **Exemplo:** `style: 🎨 padronizar indentação para 4 espaços`

- **perf** ⚡  
  Para otimizações que melhoram desempenho.  
  **Exemplo:** `perf: ⚡ melhorar consulta SQL para reduzir tempo de resposta`

- **ci** 🤖  
  Para mudanças em pipelines ou automações de integração contínua.  
  **Exemplo:** `ci: 🤖 adicionar job de lint no GitHub Actions`

- **build** 🏗️  
  Para alterações no build do projeto.  
  **Exemplo:** `build: 🏗️ adicionar plugin do Maven Surefire`

- **BREAKING CHANGE** 💥  
  Use para indicar alterações que quebram compatibilidade com versões anteriores.  
  Deve **sempre** vir acompanhado de uma descrição clara do impacto.  
  **Exemplo:**
  ```
  feat: ✨ reestruturação do módulo de autenticação

  BREAKING CHANGE: endpoints /auth/login e /auth/logout foram renomeados para /v2/auth/*
  É necessário atualizar os clientes que consomem a API.
  ```

> **Dica:** Sempre que houver alterações em endpoints, contratos de API, ou mudanças em entidades que possam causar falhas em sistemas clientes, **utilize BREAKING CHANGE**.


## Boas Práticas
- Escreva **sempre em português**, exceto quando o nome técnico exigir.
- A mensagem deve ser **imperativa**, como se estivesse dando um comando:
    - ✅ `feat: ✨ adicionar validação para CPF no cadastro`
    - ❌ `feat: ✨ adicionado validação para CPF`
- **Evite mensagens vagas** como `fix: corrigido bug` ou `update: atualizações`.
- Se o commit incluir várias mudanças, use o corpo para detalhar:

### feat: ✨ adicionar módulo de faturamento

- Criado service de cálculo de impostos

- Adicionado mapper entre DTO e entidade

- Criado testes unitários


---

## Recursos Úteis
- [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)
- [Gitmoji – Guia de Emojis](https://gitmoji.dev/)
- [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) - Automação de versionamento e changelog
- [Husky](https://typicode.github.io/husky/#/) - Hooks de Git para validar mensagens de commit
- [Commitlint](https://commitlint.js.org/#/) - Validação de mensagens
- [padroes-de-commits](https://github.com/iuricode/padroes-de-commits) - iuricode