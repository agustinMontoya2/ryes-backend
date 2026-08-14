import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import config from "../../config/config";

import { buildPostgresqlOptions } from "./postgresql-options";

import type { ConfigType } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { postgresql } = configService.get("config") as ConfigType<
          typeof config
        >;
        return buildPostgresqlOptions(postgresql, {
          dropSchema: postgresql.DB_DROP_SCHEMA,
        });
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresqlModule {}
