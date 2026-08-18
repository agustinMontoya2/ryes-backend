import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, LessThan, Repository } from "typeorm";

import { TokenTypeEnum } from "@common/enums";

import { AuthTokenEntity } from "../orm/entities";

@Injectable()
export class AuthTokenRepository {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private readonly repo: Repository<AuthTokenEntity>,
  ) {}

  async create(
    userId: string,
    token: string,
    expiresAt: Date,
    type: TokenTypeEnum,
  ): Promise<AuthTokenEntity> {
    return this.repo.save(this.repo.create({ userId, token, expiresAt, type }));
  }

  async markAsUsed(token: string): Promise<void> {
    await this.repo.update({ token }, { usedAt: new Date() });
  }

  async findValidToken(
    token: string,
    type?: TokenTypeEnum,
  ): Promise<AuthTokenEntity | null> {
    return this.repo.findOne({
      where: {
        token,
        usedAt: IsNull(),
        deletedAt: IsNull(),
        ...(type ? { type } : {}),
      },
    });
  }

  async invalidateAllForUser(userId: string, type?: TokenTypeEnum): Promise<void> {
    await this.repo.update(
      {
        userId,
        usedAt: IsNull(),
        deletedAt: IsNull(),
        ...(type ? { type } : {}),
      },
      { usedAt: new Date() },
    );
  }

  async cleanupExpired(): Promise<void> {
    await this.repo.delete({
      expiresAt: LessThan(new Date()),
      deletedAt: IsNull(),
    });
  }
}
