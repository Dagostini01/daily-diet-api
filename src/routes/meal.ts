import type { FastifyInstance } from "fastify";
import { knex } from "../database.js";
import z from "zod";

export async function mealRoutes(app: FastifyInstance) {

    //1-zodSchema 2-zodSchemaParseReq 3-Query

    app.patch('/:id', async (request) => {
        const mealSchemaParams = z.object({
            id: z.string().uuid()
        })
        const mealSchemaBody = z.object({
            name: z.string(),
            description: z.string(),
            isDiet: z
                .enum(['diet', 'not_diet'])
                .transform((value) => (value === 'diet' ? 1 : 2)),
        })
        const { id } = mealSchemaParams.parse(request.params)
        const mealUpdateData = mealSchemaBody.parse(request.body)
        const mealUpdate = await knex('meals').where('id', id).update(mealUpdateData)
        return { mealUpdate }
    })

    app.delete('/:id', async (request) => {
        const mealSchemaParams = z.object({
            id: z.string().uuid()
        })
        const { id } = mealSchemaParams.parse(request.params)
        const mealDeleted = await knex('meals').where('id', id).delete()
        return { mealDeleted }
    })

    app.post('/', async (request, reply) => {
        const mealsBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            isDiet: z
                .enum(['diet', 'not_diet'])
                .transform((value) => (value === 'diet' ? 1 : 2)),
        })
        const { name, description, isDiet } = mealsBodySchema.parse(request.body)
        await knex('meals').insert({
            id: crypto.randomUUID(),
            name,
            description,
            isDiet,
        })
        return reply.status(201).send()
    })

    app.get('/', async () => {
        const getAllMeals = await knex('meals').select('*')
        return { getAllMeals }
    })

    app.get('/:id', async (request) => {
        const mealParamsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = mealParamsSchema.parse(request.params)
        const mealFiltered = await knex('meals').where('id', id).first()
        return { mealFiltered }
    })

}