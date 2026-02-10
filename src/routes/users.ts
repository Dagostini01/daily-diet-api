import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"

export async function usersRoutes(app: FastifyInstance) {
    app.get('/users', async () => {
        const tables = await knex('users').select('*')
        return tables
    })
}