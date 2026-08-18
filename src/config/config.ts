import { registerAs } from "@nestjs/config";

import { AppConfig, AuthConfig, PostgresqlConfig, SwaggerConfig } from "./stack";

export default registerAs("config", () => {
  return {
    app: AppConfig(),
    auth: AuthConfig(),
    swagger: SwaggerConfig(),
    postgresql: PostgresqlConfig(),
  };
});
