import {
  Column,
  Entity,
  Index,
} from "typeorm";

import { BaseEntity } from "./base.orm-entity";

@Entity("services")
export class ServiceEntity extends BaseEntity {
  @Index()
  @Column({ name: "branch_id", type: "uuid" })
  branchId: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "price", type: "int" })
  price: number;
}
