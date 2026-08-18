import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

import { BranchEntity } from "./branch.orm-entity";
import { UserEntity } from "./user.orm-entity";

@Entity("user_branches")
export class UserBranchEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid", nullable: false })
  userId: string;

  @Column({ name: "branch_id", type: "uuid", nullable: false })
  branchId: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => BranchEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "branch_id" })
  branch: BranchEntity;
}
