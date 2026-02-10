import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production',]).default('production'),
    DATABASE_URL: z.string().default('./db/app.db'),
    PORT: z.coerce.number().default(3333),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.error('❌ Invalid environment variables', parsed.error.format())
    throw new Error('Invalid environment variables')
}

export const env = parsed.data
