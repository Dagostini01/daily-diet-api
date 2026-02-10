import type { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./db/migrations",
    extension: "ts",
    loadExtensions: [".ts"],
  },
};

export default config;
