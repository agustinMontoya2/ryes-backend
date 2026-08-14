import {
  Column,
  Entity,
  Index,
} from "typeorm";

import { BaseEntity } from "./base.orm-entity";

@Entity("dentists")
export class DentistEntity extends BaseEntity {
  @Index()
  @Column({ name: "branch_id", type: "uuid" })
  branchId: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "lastname", type: "varchar" })
  lastname: string;
}
