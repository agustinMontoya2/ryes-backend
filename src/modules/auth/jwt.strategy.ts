import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import config from "../../config/config";

import type { ConfigType } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const { auth } = configService.get("config") as ConfigType<typeof config>;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: auth.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string; isSuperAdmin: boolean }) {
    return { id: payload.sub, isSuperAdmin: payload.isSuperAdmin };
  }
}
