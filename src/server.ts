import Fastify from "fastify";
import { usersRoutes } from "./routes/users.js";
import { mealRoutes } from "./routes/meal.js";
import { env } from "./env/index.js";

const app = Fastify()

app.register(usersRoutes, { prefix: 'users' })
app.register(mealRoutes, { prefix: 'meals' })

app.listen({ port: env.PORT })
    .then(() => {
        console.log("HTTP Server Running")
    })
