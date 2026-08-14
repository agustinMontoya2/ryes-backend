import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { JobReportOrderEntity } from "./job-report-order.orm-entity";

@Entity("job_reports")
export class JobReportEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ name: "branch_id", type: "uuid" })
  branchId: string;

  @Column({ name: "delivery_date", type: "date" })
  deliveryDate: Date;

  @Column({ name: "total_price", type: "int" })
  totalPrice: number;

  @OneToMany(
    () => JobReportOrderEntity,
    (jobReportOrder) => jobReportOrder.jobReport,
  )
  orderLinks: JobReportOrderEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
  deletedAt: Date | null;
}
