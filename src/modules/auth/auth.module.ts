import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import config from "../../config/config";
import { AuthTokenEntity, UserEntity } from "../../infrastructure/orm/entities";
import {
  AuthTokenRepository,
  UserRepository,
} from "../../infrastructure/repositories";
import { NotificationModule } from "../notification";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

import type { ConfigType } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthTokenEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { auth } = configService.get("config") as ConfigType<
          typeof config
        >;
        return {
          secret: auth.JWT_SECRET,
          signOptions: { expiresIn: auth.JWT_EXPIRATION },
        };
      },
    }),
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, AuthTokenRepository],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
