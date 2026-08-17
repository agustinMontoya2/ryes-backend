import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { JobReportOrderEntity } from "../orm/entities";

@Injectable()
export class JobReportOrderRepository {
  constructor(
    @InjectRepository(JobReportOrderEntity)
    private readonly repository: Repository<JobReportOrderEntity>,
  ) {}

  existsByOrderId(orderId: string): Promise<boolean> {
    return this.repository
      .createQueryBuilder("link")
      .innerJoin("link.jobReport", "report")
      .where("link.order_id = :orderId", { orderId })
      .andWhere("report.deletedAt IS NULL")
      .getExists();
  }

  create(data: Partial<JobReportOrderEntity>): Promise<JobReportOrderEntity> {
    return this.repository.save(this.repository.create(data));
  }
}
