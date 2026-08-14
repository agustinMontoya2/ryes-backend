import {
  Column,
  Entity,
  Index,
  Unique,
} from "typeorm";

import { BaseEntity } from "./base.orm-entity";

@Entity("patients")
@Unique(["branchId", "dni"])
export class PatientEntity extends BaseEntity {
  @Index()
  @Column({ name: "branch_id", type: "uuid" })
  branchId: string;

  @Column({ name: "fullname", type: "varchar" })
  fullname: string;

  @Column({ name: "dni", type: "int" })
  dni: number;
}
