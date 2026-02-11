import type { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import z from "zod"

export async function usersRoutes(app: FastifyInstance) {

    //1-zod schema 2-parse 3-query

    app.put('/:id', async (request) => {
        const editUserParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const editUserBodySchema = z.object({
            name: z.string(),
            email: z.email(),
        })
        const { id } = editUserParamsSchema.parse(request.params)
        const userEditdata = editUserBodySchema.parse(request.body)
        const userEdit = await knex('users').where('id', id).update(userEditdata)
        return { userEdit }
    })

    app.patch('/:id', async (request) => {
        const editUserParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const editUserBodySchema = z.object({
            name: z.string(),
            email: z.email().optional(),
        })
        const { id } = editUserParamsSchema.parse(request.params)
        const userEditdata = editUserBodySchema.parse(request.body)
        const userEdit = await knex('users').where('id', id).update(userEditdata)
        return { userEdit }
    })

    app.delete('/:id', async (request) => {
        const deleteUserBodySchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = deleteUserBodySchema.parse(request.params)
        const userDelete = await knex('users').where('id', id).delete()
        return { userDelete }
    })

    app.post('/', async (request, reply) => {
        const createUserBodySchema = z.object({
            name: z.string(),
            email: z.email(),
        })
        const { name, email } = createUserBodySchema.parse(request.body)
        await knex('users').insert({
            id: crypto.randomUUID(),
            name,
            email
        })
        return reply.status(201).send()
    })

    app.get('/', async () => {
        const users = await knex('users').select('*')
        return { users }
    })

    app.get('/:id', async (request) => {
        const getUserParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getUserParamsSchema.parse(request.params)
        const userFiltered = await knex('users').where('id', id).first()
        return { userFiltered }
    })
}