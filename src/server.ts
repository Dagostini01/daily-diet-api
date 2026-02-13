import Fastify from "fastify";
import { usersRoutes } from "./routes/users.js";
import { mealRoutes } from "./routes/meal.js";

const app = Fastify()

app.register(usersRoutes, { prefix: 'users' })
app.register(mealRoutes, { prefix: '/meals' })

app.listen({ port: 3333 })
    .then(() => {
        console.log("HTTP Server Running")
    })
