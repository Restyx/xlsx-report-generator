/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  NodeEnv: process.env.NODE_ENV ?? "",
  Port: process.env.PORT ?? 0,
  TypeOrm: {
    Postgres: {
      type: "postgres",
      host: process.env.POSTGRES_HOST ?? "",
      port: Number(process.env.POSTGRES_PORT) ?? 0,
      username: process.env.POSTGRES_USER ?? "",
      password: process.env.POSTGRES_PASSWORD ?? "",
      database: process.env.POSTGRES_DB ?? "",
    },
  },
} as const;
