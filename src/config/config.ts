import { registerAs } from "@nestjs/config";

import { AppConfig, PostgresqlConfig, SwaggerConfig } from "./stack";

export default registerAs("config", () => {
  return {
    app: AppConfig(),
    swagger: SwaggerConfig(),
    postgresql: PostgresqlConfig(),
  };
});
