# Carteira Financeira API

API REST para gerenciamento de uma carteira financeira, desenvolvida como desafio técnico para **Grupo Adriano Cobuccio**.

A aplicação permite que usuários criem suas contas, realizem autenticação e efetuem transferências de saldo entre carteiras, com suporte à reversão de transações.

## Tecnologias

* **Node.js**
* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **JWT**
* **bcrypt**
* **Docker**
* **Vitest**

## Funcionalidades

* Cadastro de usuários
* Criação automática de carteira no cadastro
* Autenticação utilizando JWT
* Transferência entre usuários
* Validação de saldo disponível
* Reversão de transferências
* Registro das transações
* Operações financeiras executadas de forma atômica

## Arquitetura

A aplicação utiliza uma arquitetura em camadas, buscando manter as responsabilidades separadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

## Modelagem

A aplicação possui três entidades principais:

```text
User
 │
 │ 1:1
 ↓
Wallet
 │
 │ 1:N
 ↓
Transaction
```

## Segurança

A API utiliza JWT para autenticação.

As senhas não são armazenadas em texto puro. Elas são processadas utilizando `bcrypt` antes de serem persistidas.

O fluxo de autenticação é:

```text
Cadastro
   ↓
Senha recebe hash
   ↓
Usuário + carteira são criados
   ↓
Login
   ↓
Validação da senha
   ↓
JWT
   ↓
Endpoints protegidos
```

Também são utilizados DTOs para validação dos dados recebidos pela API.

## Transferências

Uma transferência altera três informações:

```text
Carteira de origem
        ↓
    - valor
        ↓
Carteira de destino
        ↓
    + valor

        +

Registro da transação
```

Essas operações são executadas dentro de uma transação do banco de dados.

Caso uma das operações falhe, as alterações anteriores são revertidas.

Exemplo:

```text
Carteira A: R$ 1.000,00
Carteira B: R$   500,00

Transferência: R$ 200,00

Carteira A: R$   800,00
Carteira B: R$   700,00
```

## Reversão

Uma transferência concluída pode ser revertida.

Exemplo:

```text
Transferência original:

A ─── R$ 200 ───> B


Reversão:

B ─── R$ 200 ───> A
```

A transação original passa para o estado `REVERSED` e uma nova transação representa a devolução do valor.

As alterações também são realizadas dentro de uma transação do banco.

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

* Node.js
* npm
* Docker
* Docker Compose

## Instalação

Clone o projeto:

```bash
git clone <https://github.com/jao241/digital-wallet-api.git>
```

Entre no diretório:

```bash
cd ac-carteira-digital
```

Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/virtual-wallet"
JWT_SECRET="sua-chave-secreta"
JWT_EXPIRES_IN="1d"
```

Não versione o arquivo `.env`.

Utilize o `.env.example` como referência.

## Banco de dados e API

Suba o PostgreSQL e a API utilizando Docker:

```bash
docker compose up -d
```

Execute as migrations:

```bash
docker exec -it virtual-wallet-api npx prisma migrate dev
```

Gere o Prisma Client:

```bash
docker exec -it virtual-wallet-api npx prisma generate
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## Documentação

A API possui documentação através do Swagger.

Após iniciar a aplicação, acesse:

```text
http://localhost:3000/api
```

A documentação permite visualizar e testar os endpoints disponíveis.


## Build

Para gerar a versão de produção:

```bash
npm run build
```

## Estrutura do projeto

Uma visão simplificada da estrutura:

```text
src/
├── auth/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.service.spec.ts
│
├── user/
│   ├── entities/
│   ├── user-repository/
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user-repository/
│
├── wallet/
│   ├── dto/
│   ├── entities/
│   ├── wallet-repository/
│   ├── wallet.controller.ts
│   ├── wallet.service.ts
│   └── wallet-repository/
│
├── transaction/
│   ├── dto/
│   ├── entities/
│   ├── transaction-repository/
│   ├── transaction.controller.ts
│   ├── transaction.service.ts
│   └── transaction-repository/
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── app.controller.ts
└── app.module.ts
```

## Decisões técnicas

### Valores monetários

Os valores são armazenados em centavos utilizando inteiros.

Por exemplo:

```text
R$ 10,50 → 1050
R$ 100,00 → 10000
```

Essa abordagem evita problemas de precisão associados a números de ponto flutuante.

### Transações do banco

Transferências e reversões envolvem múltiplas alterações no banco.

Por isso, as operações são executadas utilizando transações do Prisma, garantindo que as alterações sejam confirmadas ou revertidas em conjunto.

### Separação de responsabilidades

A separação entre Controller, Service e Repository permite que:

* Controllers cuidem da camada HTTP;
* Services concentrem as regras de negócio;
* Repositories cuidem da persistência.

Essa divisão facilita manutenção, testes e evolução da aplicação.

## Melhorias futuras

Alguns pontos podem ser evoluídos em uma versão futura:

* testes unitários;
* testes de integração com PostgreSQL;
* testes E2E;
* testes de arquitetura;
* implementação de controle mais avançado de concorrência em transferências;
* logging estruturado;
* monitoramento e métricas;
* rate limiting;
* idempotência para operações financeiras;
* mecanismo mais robusto de auditoria das transações.