# Possibilidades de utilização e banco de dados dentro da aplicação
## Utilizando drivers nativos de cada banco de dados. Exemplo:
[node-postgreSQL](https://node-postgres.com/)

Aonde o driver do node vai fazer as queries de maneira "manual", mais próximo dos conceitos do SQL puro.

```js
const { Client } = require('pg');
const client = new Cliente();
away client.connect();

const res = await client.query('Select $1::text as message', ['Hello World!']);
console.log(res.rows[0].message) // Hello World!
await client.end();

```

* Desvantagem: Para cada banco de dados teria que instalar o driver e cada driver pode se comportar de maneira diferente, gerando muitas alterações no código e dificultando a manutenção.


## Query builder :
[Knex.js](https://knexjs.org/)

SQL + Javascript 
Exemplo insert:

```js
const pg = require('knex')({client: 'pg'});
knex('table').insert({a: 'b'}).returning('*').toString();
// "insert into "table" ("a") values ('b')"

pg('table').insert({a: 'b'}).returning('*').toString();
// "insert into "table" ("a") values ('b') returning *"

```

## ORM - mapeamento objeto-relacional 

[TYPEORM](typeorm.io) / [Sequelize](https://sequelize.org/master/)

* Passa o objeto e o ORM fica responsável por transformar em uma forma que o banco de dados entenda

`MODEL <-> ORM <-> BANCO DE DADOS`

## Instalação typeORM
1. Install the yarn package:
   
```properties bash

yarn add typeorm reflect-metadata

```

2. Install database driver for PostgreSQL database:

```properties bash

yarn add pg 

```
3. Ajustando o tsconfig.json:

```json

"emitDecoratorMetadata": true,
"experimentalDecorators": true

```
4. Criar new folder database dentro no src > index.ts 
   
```ts

import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

```
5. Importando no server.ts:

```ts

import './database';

```

6. Passar as configurações do banco de dados pra dentro da aplicação (Pode utilizar .json, .js, .yaml, .xml e environment variable)- `ormconfig.json`:

```json

{
  "type": "postgres",
  "port": 5432,
  "host": "localhost", //Aqui fica como localhost
  "username": "docker",
  "password": "ignite",
  "database": "rentx", 
  "migrations": ["./src/database/migrations/*.ts"],
  "entities": ["./src/modules/**/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

```

## Criação no Docker Compose de container do banco de dados para a aplicação:
E o `docker-compose.yaml` fica assim:

```yaml
version: "3.9"

services:
  database: #ESSE É O NOME DO SERVICE QUE DEVE ESTAR NO ARQUIVO DE CRIAÇÃO DE CONEXÃO
    image: postgres
    container_name: database_ignite
    restart: always
    ports: 
      - 5432:5432
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=ignite
      - POSTGRES_DB=rentx
    volumes:
      - pgdata:/data/postgres

  app:
    build: .
    container_name: rentx
    restart: always
    ports: 
      - 3333:3333
      - 9229:9229 #Você pode inserir essa porta tbm pra poder usar o debug
    volumes: 
      - .:/usr/app
    links: 
      - database
    depends_on:
      - database

volumes:
  pgdata:
    driver: local
```

>>[Ver mais aqui:](https://www.notion.so/Refatora-o-Docker-com-TypeORM-4500fc0d075349ac9b97d670e734d41b)

---

# Database Migrations
É uma forma de versionar o schema do bando de dados de sua aplicação
* Uniformização e controle dos requisitos criados no banco de dados, controle de ambiente principalmente para mais equipes de desenvolvimento.

* Com a utilização do TypeORM:
No package.json criar script:

```json
"typeorm": "ts-node-dev ./node_modules/typeorm/cli"

```
* Criar pasta migrations dentro de src/database

* e adicionar ao `ormconfig.json`:

```json
"cli": {
    "migrationsDir": "./src/database/migrations"

```
## Configuração do ambiente ok agora para a criação da migration:

```properties bash

yarn typeorm migration:create -n [nome-da-migrations]

```
>> OBS não usar uuid como `chave primária` - o identificador da linha no banco de dados, ela sempre vai ter um índice associado e não pode ter valores duplicados nesse campo.

* Com a migration criada, ex:

```ts

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1642707522104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}

```
* No ormconfig.json informar o caminho aonde estão as migrations:

```json

"migrations": ["./src/database/migrations/*.ts"],

```

* No terminal para rodar as migrations

```properties bash

yarn typeorm migration:run

```
* Para desfazer a migration
```properties bash

yarn typeorm migration:revert

```


**Fonte: Documentação TypeORM**

* Deletar alguma tablea/informação da migration:
```properties bash

yarn typeorm migration:create -n AlterUserDeleteUsername

```


