import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.orm-entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ name: "is_super_admin", type: "boolean", default: false })
  isSuperAdmin: boolean;
}
