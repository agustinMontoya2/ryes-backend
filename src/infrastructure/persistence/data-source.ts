import "dotenv/config";
import { DataSource } from "typeorm";

import { PostgresqlConfig } from "../../config/stack";
import { buildPostgresqlOptions } from "../postgresql/postgresql-options";

export const appDataSource = new DataSource(
  buildPostgresqlOptions(PostgresqlConfig()),
);
