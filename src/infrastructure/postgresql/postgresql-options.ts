import { PostgresqlConfig } from "../../config/stack";
import {
  BranchEntity,
  DentistEntity,
  JobReportEntity,
  JobReportOrderEntity,
  OrderEntity,
  PatientEntity,
  ServiceEntity,
} from "../orm/entities";

export const POSTGRESQL_ENTITIES = [
  BranchEntity,
  PatientEntity,
  DentistEntity,
  ServiceEntity,
  OrderEntity,
  JobReportEntity,
  JobReportOrderEntity,
];

export function buildPostgresqlOptions(
  config: ReturnType<typeof PostgresqlConfig>,
  extra: { dropSchema?: boolean } = {},
) {
  return {
    type: "postgres" as const,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    entities: POSTGRESQL_ENTITIES,
    migrations: ["src/infrastructure/migrations/**/*.ts"],
    synchronize: config.DB_SYNCHRONIZE,
    logging: config.DB_LOGGING,
    ssl: config.DB_SSL,
    dropSchema: extra.dropSchema,
  };
}
