import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import config from "../../config/config";

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
        return {
          type: "postgres" as const,
          host: postgresql.DB_HOST,
          port: postgresql.DB_PORT,
          username: postgresql.DB_USER,
          password: postgresql.DB_PASS,
          database: postgresql.DB_NAME,
          entities: [],
          synchronize: postgresql.DB_SYNCHRONIZE,
          logging: postgresql.DB_LOGGING,
          dropSchema: postgresql.DB_DROP_SCHEMA,
          ssl: postgresql.DB_SSL,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresqlModule {}
