import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    cookies: Record<string, string>;
    user?: {
      id: string;
      name?: string;
      email?: string;
      session_id?: string;
    };
  }
}
