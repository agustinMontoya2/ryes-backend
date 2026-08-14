import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";
import config from "./config/config";

import type { ConfigType } from "@nestjs/config";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigType<typeof config>>(config.KEY);

  if (configService.app.ACTIVATE_HELMET_SECURITY) {
    app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: false,
        strictTransportSecurity: { maxAge: 63072000, includeSubDomains: true },
      }),
    );
  }

  if (configService.app.ACTIVATE_CORS) {
    app.enableCors({ origin: true, credentials: true });
  }

  if (configService.app.ACTIVATE_VERSIONING) {
    app.enableVersioning();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix("api/v1");

  if (configService.swagger.SWAGGER_PATH) {
    const documentConfig = new DocumentBuilder()
      .setTitle(configService.swagger.SWAGGER_DOCS_TITLE)
      .setDescription(
        [
          configService.swagger.SWAGGER_DOCS_DESCRIPTION,
          "All responses are wrapped in the global envelope: `{ statusCode, message, details: { path, timestamp }, payload }`.",
          "Errors use: `{ statusCode, errorCode, message, details, metadata }`.",
        ].join(" "),
      )
      .setVersion(configService.swagger.SWAGGER_DOCS_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup(configService.swagger.SWAGGER_PATH, app, document, {
      useGlobalPrefix: true,
      swaggerOptions: { persistAuthorization: true },
    });
    Logger.log(
      `Swagger UI available at /${configService.swagger.SWAGGER_PATH}`,
      "Bootstrap",
    );
  }

  await app.listen(configService.app.PORT);
  Logger.log(
    `Application running on port ${configService.app.PORT} in ${configService.app.STAGE} mode`,
    "Bootstrap",
  );
}

bootstrap();
