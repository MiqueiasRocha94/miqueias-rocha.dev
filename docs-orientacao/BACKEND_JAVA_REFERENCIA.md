# Backend Java (Referencia)

Este arquivo consolida preferencias para projetos Java/Spring Boot.
Use apenas quando houver backend Java neste repositorio.

## Arquitetura
- DDD + Clean Architecture.
- Camadas: domain, application, infrastructure, interfaces.
- Regras:
  - domain nao depende de frameworks.
  - logica de negocio fica no domain.
  - controllers apenas orquestram chamadas.
  - services implementam casos de uso.

## Java
- Preferir versoes LTS.
- Evitar boilerplate.
- Bibliotecas: Lombok e MapStruct.

## Lombok
- Avaliar necessidade antes de usar.
- Usar @Getter apenas quando houver leitura.
- Usar @Setter apenas quando necessario.
- Usar @Data somente quando houver getter e setter.
- Evitar @Data em entidades de dominio.
- Preferir @Builder para criacao de objetos.
- Usar @RequiredArgsConstructor para injecao.

## DTO
- Nunca expor entidades diretamente.
- DTO para entrada e saida da API.
- DTO simples, sem logica de negocio.

## Mapper (MapStruct)
- Converter entidade <-> DTO.
- Mapper sem logica de negocio.

## Documentacao e Javadoc
- Javadoc em pt-BR.
- Obrigatorio para classes e metodos publicos.
- Metodos privados apenas se complexos.
- Documentar objetivo, parametros, retorno e excecoes.

## API
- Swagger/OpenAPI3 em pt-BR.
- Todos endpoints documentados.
- Documentar request/response e exemplos quando possivel.

## Logs
- Logs em pt-BR, estruturados.
- Usar placeholders.
- Evitar concatenacao de strings.

## Excecoes
- Global handler com @RestControllerAdvice.
- Padronizar respostas de erro.
- Separar excecoes de negocio e tecnicas.
