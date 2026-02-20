import Fastify from "fastify";
import cookie from "@fastify/cookie";
import { usersRoutes } from "./routes/users.js";
import { mealRoutes } from "./routes/meal.js";
import { env } from "./env/index.js";

const app = Fastify()

app.register(cookie)
app.register(usersRoutes, { prefix: 'users' })
app.register(mealRoutes, { prefix: 'meals' })

app.listen({ port: env.PORT })
    .then(() => {
        console.log("HTTP Server Running")
    })
