import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import { BaseEntity } from "./base.orm-entity";
import { DentistEntity } from "./dentist.orm-entity";
import { PatientEntity } from "./patient.orm-entity";
import { ServiceEntity } from "./service.orm-entity";

@Entity("orders")
export class OrderEntity extends BaseEntity {
  @Index()
  @Column({ name: "branch_id", type: "uuid" })
  branchId: string;

  @Index()
  @ManyToOne(() => PatientEntity, { nullable: false })
  @JoinColumn({ name: "patient_id" })
  patient: PatientEntity;

  @Index()
  @ManyToOne(() => DentistEntity, { nullable: false })
  @JoinColumn({ name: "dentist_id" })
  dentist: DentistEntity;

  @Column({ name: "dispatch_date", type: "date" })
  dispatchDate: Date;

  @Column({ name: "due_date", type: "date" })
  dueDate: Date;

  @Column({ name: "lab", type: "varchar", nullable: true })
  lab: string | null;

  @Column({
    name: "status",
    type: "enum",
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @ManyToMany(() => ServiceEntity)
  @JoinTable({
    name: "order_services",
    joinColumn: { name: "order_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "service_id", referencedColumnName: "id" },
  })
  services: ServiceEntity[];
}
