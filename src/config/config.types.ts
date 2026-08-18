import type { AppConfig, AuthConfig, PostgresqlConfig, SwaggerConfig } from "./stack";

export type MixedConfigsForEnvFile =
  | ReturnType<typeof AppConfig>
  | ReturnType<typeof AuthConfig>
  | ReturnType<typeof PostgresqlConfig>
  | ReturnType<typeof SwaggerConfig>;
