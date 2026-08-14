import type { AppConfig, PostgresqlConfig, SwaggerConfig } from "./stack";

export type MixedConfigsForEnvFile =
  | ReturnType<typeof AppConfig>
  | ReturnType<typeof PostgresqlConfig>
  | ReturnType<typeof SwaggerConfig>;
