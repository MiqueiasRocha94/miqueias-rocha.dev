# Orientacao do Projeto

Este conjunto de documentos descreve as regras e preferencias para evoluir este projeto.
Eles ficam isolados nesta pasta para nao misturar com o codigo de producao.

## COMMITS

Toda modificação realizada pelo agente deve gerar uma mensagem de commit seguindo o padrão definido no arquivo:

`CONVENTIONAL_COMMIT.md`

### Regras

* Sempre gerar uma mensagem de commit ao finalizar alterações no código.
* A mensagem deve seguir o padrão **Conventional Commits** definido no documento `CONVENTIONAL_COMMIT.md`.
* O tipo de commit deve refletir corretamente a natureza da mudança (feat, fix, refactor, docs, test, chore, etc).
* A descrição deve ser clara, objetiva e em **português**.
* Quando necessário, incluir uma lista de alterações no corpo do commit.

### Estrutura esperada

tipo: descrição curta da alteração

* alteração 1
* alteração 2
* alteração 3

### Exemplo

feat: adicionar endpoint de cadastro de cliente

* criado controller de cliente
* implementado service de cadastro
* adicionado mapper DTO com MapStruct
* documentado endpoint no Swagger


## Arquivos
- `ORIENTACAO_GERAL.md`
- `CONVENCOES_DE_CODIGO.md`
- `ARQUITETURA_E_ESTRUTURA.md`
- `TESTES_E_QUALIDADE.md`
- `BACKEND_JAVA_REFERENCIA.md`
- `CONVENTIONAL_COMMIT.md`

## Como usar
- Leia `ORIENTACAO_GERAL.md` antes de iniciar alteracoes.
- Use `CONVENCOES_DE_CODIGO.md` para padroes de estilo e organizacao.
- Use `ARQUITETURA_E_ESTRUTURA.md` para localizar arquivos e manter a organizacao.
- Use `TESTES_E_QUALIDADE.md` para padroes de testes.
- Use `BACKEND_JAVA_REFERENCIA.md` apenas quando houver servicos Java.
