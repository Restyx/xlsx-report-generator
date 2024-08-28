import { DataSource } from "typeorm";
import EnvVars from "@src/common/EnvVars";

const postgresOptions = EnvVars.TypeOrm.Postgres;

export const AppDataSource = new DataSource({
  type: postgresOptions.type,
  host: postgresOptions.host,
  port: postgresOptions.port,
  username: postgresOptions.username,
  password: postgresOptions.password,
  database: postgresOptions.database,
  entities: ["src/entities/*entity.ts"],
  logging: true,
  synchronize: true,
});
