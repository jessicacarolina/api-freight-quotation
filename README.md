## Detalhes sobre a API
A API foi desenvolvida em Typescript e segue a arquitetura da Clean Architecture. A Clean Architecture é um padrão de arquitetura de software que visa separar as preocupações e manter o código limpo e bem organizado. Suas principais vantagens são a facilidade de manutenção, a escalabilidade e a testabilidade do sistema.

A API consome uma API externa para solicitar cotações de frete de produtos. Ao receber as cotações, elas são armazenadas no banco de dados PostgreSQL. Essa abordagem permite que você mantenha um registro das cotações para referência futura.

Além disso, a API oferece a funcionalidade de buscar métricas das cotações salvas. Essas métricas são agrupadas por transportadora, permitindo que o usuário obtenha uma visão consolidada das cotações disponíveis. Essa funcionalidade é útil para análise e tomada de decisões relacionadas ao transporte de produtos.

Para facilitar o desenvolvimento, implantação e execução da aplicação, utilizei o Docker para containerizar toda a aplicação. Isso proporciona maior portabilidade e consistência do ambiente de execução, evitando problemas de dependências e configurações em diferentes ambientes.

Além disso, a aplicação está coberta por testes, o que é extremamente importante para garantir a qualidade do software. Os testes ajudam a identificar problemas e asseguram que as funcionalidades estão funcionando corretamente.

## Requisitos para rodar a API

- Tenha o docker instalado na sua máquina


## Começando 

- Clone o projeto do Github

- Configure o .env 

**Instale as dependências do projeto**

```bash 
npm install
```

**Crie o docker**

```docker 
docker compose up
```
**Seu ambiente está pronto para ser usado :)**

## Informações sobre a cobertura do código

```
-----------------------------------|---------|----------|---------|---------|-------------------
File                               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------------|---------|----------|---------|---------|-------------------
All files                          |   96.55 |     90.9 |      95 |   96.96 |                   
 infra/database                    |   88.88 |      100 |   66.66 |   88.88 |                   
  PGPromiseAdapter.ts              |   88.88 |      100 |   66.66 |   88.88 | 20                
 infra/repository                  |   94.73 |       80 |     100 |   94.73 |                   
  FreightFakeRepositoryDatabase.ts |   94.73 |       80 |     100 |   94.73 | 28                
 service                           |    97.5 |     92.3 |     100 |     100 |                   
  FreightService.ts                |    97.5 |     92.3 |     100 |     100 | 88                
-----------------------------------|---------|----------|---------|---------|-------------------
```

Feito com ❤️ por **Jéssica Melo**
