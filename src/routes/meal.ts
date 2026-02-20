import type { FastifyInstance } from "fastify";
import { knex } from "../database.js";
import z from "zod";
import { randomUUID } from "crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js";

export async function mealRoutes(app: FastifyInstance) {

    //1-zodSchema 2-zodSchemaParseReq 3-Query

    app.patch('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
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
        const { sessionId } = request.cookies
        const mealUpdate = await knex('meals').where({ 'id': id, 'session_id': sessionId }).update(mealUpdateData)
        return { mealUpdate }
    })

    app.delete('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
        const mealSchemaParams = z.object({
            id: z.string().uuid()
        })
        const { id } = mealSchemaParams.parse(request.params)
        const { sessionId } = request.cookies
        const mealDeleted = await knex('meals').where({ 'id': id, 'session_id': sessionId }).delete()
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

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
        }

        await knex('meals').insert({
            id: crypto.randomUUID(),
            name,
            description,
            isDiet,
        })
        return reply.status(201).send()
    })

    app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
        const { sessionId } = request.cookies
        const getAllMeals = await knex('meals').where('session_id', sessionId).select('*')
        return { getAllMeals }
    })

    app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
        const mealParamsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = mealParamsSchema.parse(request.params)
        const { sessionId } = request.cookies
        const mealFiltered = await knex('meals').where({ 'id': id, 'session_id': sessionId }).first()
        return { mealFiltered }
    })

}