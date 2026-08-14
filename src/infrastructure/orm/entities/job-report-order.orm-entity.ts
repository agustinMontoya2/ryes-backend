import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { JobReportEntity } from "./job-report.orm-entity";
import { OrderEntity } from "./order.orm-entity";

@Entity("job_report_orders")
export class JobReportOrderEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => JobReportEntity, (jobReport) => jobReport.orderLinks, {
    nullable: false,
  })
  @JoinColumn({ name: "report_id" })
  jobReport: JobReportEntity;

  @ManyToOne(() => OrderEntity, { nullable: false })
  @JoinColumn({ name: "order_id" })
  order: OrderEntity;

  @Column({ name: "order_snapshot", type: "jsonb" })
  orderSnapshot: Record<string, unknown>;
}
