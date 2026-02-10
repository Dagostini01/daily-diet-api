import knexModule from 'knex'
import type { Knex } from 'knex'
import { env } from './env/index.js'

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL,
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
    useNullAsDefault: true,
}

export const knex = knexModule(config)
