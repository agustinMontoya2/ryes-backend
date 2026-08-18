import { Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";

import { TokenTypeEnum } from "@common/enums";

import { BaseEntity } from "./base.orm-entity";
import { UserEntity } from "./user.orm-entity";

@Entity("auth_tokens")
@Index("IDX_auth_tokens_user_id", ["userId"])
@Index("IDX_auth_tokens_token", ["token"], { unique: true })
export class AuthTokenEntity extends BaseEntity {
  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @Column({ type: "varchar", nullable: false })
  token: string;

  @Column({ type: "varchar", nullable: false })
  type: TokenTypeEnum;

  @Column({ name: "expires_at", type: "timestamptz", nullable: false })
  expiresAt: Date;

  @Column({ name: "used_at", type: "timestamptz", nullable: true })
  usedAt: Date | null;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
