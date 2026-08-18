import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import config from "../../config/config";
import { UserEntity } from "../../infrastructure/orm/entities";
import { UserRepository } from "../../infrastructure/repositories";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

import type { ConfigType } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { auth } = configService.get("config") as ConfigType<typeof config>;
        return {
          secret: auth.JWT_SECRET,
          signOptions: { expiresIn: auth.JWT_EXPIRATION },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
