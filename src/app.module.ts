import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { AppExceptionFilter } from "./common/exceptions/app-exception.filter";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import config from "./config/config";
import { configSchema } from "./config/config.schema";
import { PostgresqlModule } from "./infrastructure/postgresql/postgresql.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: configSchema,
    }),
    PostgresqlModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AppExceptionFilter },
  ],
})
export class AppModule {}
