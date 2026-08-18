import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AppError, ResponseExceptionsEnum } from "@common/exceptions";

import config from "../../config/config";
import { UserRepository } from "../../infrastructure/repositories";

import type { ForgotPasswordDto } from "./dto/forgot-password.dto";
import type { LoginDto } from "./dto/login.dto";
import type { RefreshTokenDto } from "./dto/refresh-token.dto";
import type { RegisterDto } from "./dto/register.dto";
import type { ResetPasswordDto } from "./dto/reset-password.dto";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private get authConfig() {
    const { auth } = this.configService.get("config") as ConfigType<
      typeof config
    >;
    return auth;
  }

  async register(dto: RegisterDto) {
    const existingEmail = await this.userRepository.findByEmailOrUsername(
      dto.email,
    );
    if (existingEmail) {
      throw new AppError(ResponseExceptionsEnum.USER_ALREADY_EXISTS, {
        property: "email",
      });
    }

    const existingUsername = await this.userRepository.findByEmailOrUsername(
      dto.username,
    );
    if (existingUsername) {
      throw new AppError(ResponseExceptionsEnum.USER_ALREADY_EXISTS, {
        property: "username",
      });
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      this.authConfig.BCRYPT_SALT_ROUNDS,
    );

    const user = this.userRepository.create({
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(user);

    return {
      id: saved.id,
      email: saved.email,
      username: saved.username,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmailOrUsername(
      dto.credential,
    );

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS, {
        property: "credential",
      });
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS, {
        property: "password",
      });
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id, isSuperAdmin: user.isSuperAdmin },
      { expiresIn: this.authConfig.JWT_EXPIRATION },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id, isSuperAdmin: user.isSuperAdmin, type: "refresh" },
      { expiresIn: this.authConfig.REFRESH_TOKEN_EXPIRATION },
    );

    return { accessToken, refreshToken };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmailOrUsername(
      dto.credential,
    );

    if (!user) {
      return { resetToken: null };
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, type: "reset" },
      { expiresIn: "15m" },
    );

    return { resetToken };
  }

  async resetPassword(dto: ResetPasswordDto) {
    let payload: { sub: string; type: string };

    try {
      payload = this.jwtService.verify(dto.token);
    } catch {
      throw new AppError(ResponseExceptionsEnum.INVALID_RESET_TOKEN, {
        property: "token",
      });
    }

    if (payload.type !== "reset") {
      throw new AppError(ResponseExceptionsEnum.INVALID_RESET_TOKEN, {
        property: "token",
      });
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.INVALID_RESET_TOKEN, {
        property: "token",
      });
    }

    user.password = await bcrypt.hash(
      dto.password,
      this.authConfig.BCRYPT_SALT_ROUNDS,
    );
    await this.userRepository.save(user);

    return { success: true };
  }

  async refresh(dto: RefreshTokenDto) {
    let payload: { sub: string; type: string };

    try {
      payload = this.jwtService.verify(dto.refreshToken);
    } catch {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS, {
        property: "refreshToken",
      });
    }

    if (payload.type !== "refresh") {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS, {
        property: "refreshToken",
      });
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS, {
        property: "refreshToken",
      });
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id, isSuperAdmin: user.isSuperAdmin },
      { expiresIn: this.authConfig.JWT_EXPIRATION },
    );

    return { accessToken };
  }
}
