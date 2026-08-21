import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { TokenTypeEnum } from "@common/enums";
import { AppError, ResponseExceptionsEnum } from "@common/exceptions";

import config from "../../config/config";
import {
  AuthTokenRepository,
  UserRepository,
} from "../../infrastructure/repositories";
import { EmailService } from "../notification";

import type { ForgotPasswordDto } from "./dto/forgot-password.dto";
import type { LoginDto } from "./dto/login.dto";
import type { RefreshTokenDto } from "./dto/refresh-token.dto";
import type { RegisterDto } from "./dto/register.dto";
import type { ResetPasswordDto } from "./dto/reset-password.dto";
import type { ConfigType } from "@nestjs/config";

interface TokenPayload {
  sub: string;
  isSuperAdmin?: boolean;
  type: TokenTypeEnum;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  private get authConfig() {
    const { auth } = this.configService.get("config") as ConfigType<
      typeof config
    >;
    return auth;
  }

  async register(dto: RegisterDto) {
    const [existingEmail, existingUsername] = await Promise.all([
      this.userRepository.findByEmailOrUsername(dto.email),
      this.userRepository.findByEmailOrUsername(dto.username),
    ]);

    if (existingEmail) {
      throw new AppError(ResponseExceptionsEnum.USER_ALREADY_EXISTS, {
        property: "email",
      });
    }

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

    return { id: saved.id };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByEmailOrUsername(
      dto.credential,
    );

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await this.persistToken(user.id, refreshToken, TokenTypeEnum.REFRESH, 7);

    return { accessToken, refreshToken };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmailOrUsername(
      dto.credential,
    );

    if (!user) {
      return { success: true };
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, type: TokenTypeEnum.RESET },
      { expiresIn: "15m" },
    );

    await this.authTokenRepository.invalidateAllForUser(
      user.id,
      TokenTypeEnum.RESET,
    );
    await this.persistToken(user.id, resetToken, TokenTypeEnum.RESET, 0, 15);

    await this.emailService.sendResetPasswordEmail(user.email, resetToken);

    return { success: true };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const payload = this.verifyToken(dto.token, TokenTypeEnum.RESET);

    const validToken = await this.authTokenRepository.findValidToken(
      dto.token,
      TokenTypeEnum.RESET,
    );

    if (!validToken) {
      throw new AppError(ResponseExceptionsEnum.INVALID_RESET_TOKEN);
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.INVALID_RESET_TOKEN);
    }

    const isSamePassword = await bcrypt.compare(dto.password, user.password);

    if (isSamePassword) {
      throw new AppError(ResponseExceptionsEnum.PASSWORD_SAME_AS_CURRENT, {
        property: "password",
      });
    }

    user.password = await bcrypt.hash(
      dto.password,
      this.authConfig.BCRYPT_SALT_ROUNDS,
    );
    await this.userRepository.save(user);

    await this.authTokenRepository.markAsUsed(dto.token);

    return { id: user.id };
  }

  async refresh(dto: RefreshTokenDto) {
    const payload = this.verifyToken(dto.refreshToken, TokenTypeEnum.REFRESH);

    const validToken = await this.authTokenRepository.findValidToken(
      dto.refreshToken,
      TokenTypeEnum.REFRESH,
    );

    if (!validToken) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS);
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.INVALID_CREDENTIALS);
    }

    await this.authTokenRepository.markAsUsed(dto.refreshToken);

    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    await this.persistToken(user.id, newRefreshToken, TokenTypeEnum.REFRESH, 7);

    return { accessToken, refreshToken: newRefreshToken };
  }

  private verifyToken(
    token: string,
    expectedType: TokenTypeEnum,
  ): TokenPayload {
    let payload: TokenPayload;

    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new AppError(
        expectedType === TokenTypeEnum.REFRESH
          ? ResponseExceptionsEnum.INVALID_CREDENTIALS
          : ResponseExceptionsEnum.INVALID_RESET_TOKEN,
      );
    }

    if (payload.type !== expectedType) {
      throw new AppError(
        expectedType === TokenTypeEnum.REFRESH
          ? ResponseExceptionsEnum.INVALID_CREDENTIALS
          : ResponseExceptionsEnum.INVALID_RESET_TOKEN,
      );
    }

    return payload;
  }

  private generateAccessToken(user: {
    id: string;
    isSuperAdmin: boolean;
  }): string {
    return this.jwtService.sign(
      {
        sub: user.id,
        isSuperAdmin: user.isSuperAdmin,
        type: TokenTypeEnum.ACCESS,
      },
      { expiresIn: this.authConfig.JWT_EXPIRATION },
    );
  }

  private generateRefreshToken(user: {
    id: string;
    isSuperAdmin: boolean;
  }): string {
    return this.jwtService.sign(
      {
        sub: user.id,
        isSuperAdmin: user.isSuperAdmin,
        type: TokenTypeEnum.REFRESH,
      },
      { expiresIn: this.authConfig.REFRESH_TOKEN_EXPIRATION },
    );
  }

  private async persistToken(
    userId: string,
    token: string,
    type: TokenTypeEnum,
    daysExpiresIn: number,
    minutesExpiresIn?: number,
  ): Promise<void> {
    const expiresAt = new Date();
    if (minutesExpiresIn !== undefined) {
      expiresAt.setMinutes(expiresAt.getMinutes() + minutesExpiresIn);
    } else {
      expiresAt.setDate(expiresAt.getDate() + daysExpiresIn);
    }
    await this.authTokenRepository.create(userId, token, expiresAt, type);
  }
}
