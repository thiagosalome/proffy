# Server

## Por que o NodeJS

Ele contém uma particularidade chamada None Blocking IO, ou seja, quando uma ação é executada não se espera para executar uma outra ação, funcionando de forma assíncrona. É possível fazer as ações de **salvar um usuário no banco de dados**, **enviar um email** e **criptografar a senha do usuário** ao mesmo tempo.

---

## Criando base do projeto

* Iniciar aplicação

  ```bash
  yarn init -y
  ```

* Instalar dependências
  * express: ```yarn add express```
  * @types/express: ```yarn add @types/express -D```
  * ts-node: ```yarn add ts-node -D```
  * ts-node-dev: ```yarn add ts-node-dev -D``` (Fica observando alterações em ambiente de desenvolvimento)
  * typescript: ```yarn add typescript -D```

* Criar atalho de execução do server

  ```json
  "start": "tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts"
  ```

  **OBS:** Ao adicionar a flag ```--respawn``` ele não para a execução ao salvar o arquivo.

---

## Identificando os Casos de Uso

### Conexões

* Rota para listar o total de conexões realizadas
* Rota para criar uma nova conexão

### Aulas

* Rota para criar uma aula
* Rota para listar aulas
  * Filtrar por matéria, dia da semana e horário

---

## Configurando Conexão com o Banco

Utilizaremos o SQLite porque não precisaremos instalar nada na nossa máquina.

### Knex

É uma biblioteca que permite trabalhar com banco de dados SQL com uma linguagem unificada para todos os bancos.

Com ele escremos as queries em formato de JavaScript.

* Instalar sqlite e knex

  ```bash
  yarn add knex sqlite3
  ```

* Criar arquivo /database/connection.ts

  ```ts
    import knex from 'knex'
    import path from 'path'

    const db = knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // Padroniza o caminho de acordo com o sistema operacional.
      },
      useNullAsDefault: true, // Fala para o sqlite utilizar null como default
    })

    export default db;
  ```

  **OBS:** O ```__dirname``` sempre retorna o caminho do arquivo que está chamando ele

* Criar arquivo knexfile.ts

  ```ts
  import path from 'path'

  module.exports = {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  }
  ```

---

## Migrations

As migrations permitem você fazer um controle de versão do seu banco de dados. Ajuda muito quando um projeto envolve mais de um desenvolvedor.

* 00_create_users.ts

```ts
import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
```

* 01_create_classes.ts

```ts
import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}
```

* 02_create_class_schedule.ts

```ts
import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();

    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
}
```

* 03_create_connections.ts

```ts
import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('created_at')
      .defaultTo('now()')
      .notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}
```

---

## Controllers

### ClassesController

* Criação de Classes

```ts
async create(request: Request, response: Response) {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = request.body;

  const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
      class_id,
      week_day: scheduleItem.week_day,
      from: convertHourToMinutes(scheduleItem.from),
      to: convertHourToMinutes(scheduleItem.to),
    }));

    await trx('class_schedule').insert(classSchedule);

    await trx.commit();

    return response.status(201).json({
      message: 'Created with success',
    });
  } catch (error) {
    await trx.rollback();
    return response.status(400).json({
      error: 'Unexpected error while creating new class',
    });
  }
}
```

* Listagem de Classes

```ts
async index(request: Request, response: Response) {
  const filters = request.query;

  const subject = filters.subject as string;
  const week_day = filters.week_day as string;
  const time = filters.time as string;

  if (!filters.week_day || !filters.subject || !filters.time) {
    return response.status(400).json({
      error: 'Missing filters to search classes',
    });
  }

  const timeInMinutes = convertHourToMinutes(time);

  const classes = await db('classes')
    .whereExists(function () {
      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
    })
    .where('classes.subject', '=', subject)
    .join('users', 'classes.user_id', '=', 'users.id')
    .select(['classes.*', 'users.*']);

  return response.json(classes);
}
```

### ConnectionsController

* Criação de Connections

```ts
async create(request: Request, response: Response) {
  const { user_id } = request.body;

  await db('connections').insert({
    user_id,
  });

  return response.status(201).json({ message: 'Connection created' });
}
```

* Listagem de Connections

```ts
async index(request: Request, response: Response) {
  const totalConnections = await db('connections').count('* as total');

  const { total } = totalConnections[0];

  return response.json({ total });
}
```

---

## Adicionando CORS

O CORS define quais endereços externos vão ter acesso a nossa aplicação.

Instalar o módulo de cors

```bash
yarn add cors
yarn add @types/cors -D
```

Adicionar no server.ts

```ts
import cors from 'cors'
app.use(cors())
```
