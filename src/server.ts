import Fastify from "fastify";
import { usersRoutes } from "./routes/users.js";

const app = Fastify()

app.register(usersRoutes, {prefix: 'users'})

app.listen({ port: 3333 })
    .then(() => {
        console.log("HTTP Server Running")
    })
