import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { JobReportEntity } from "../orm/entities";

export interface ReportListPaginatedOptions {
  page: number;
  limit: number;
}

@Injectable()
export class JobReportRepository {
  constructor(
    @InjectRepository(JobReportEntity)
    private readonly reportRepository: Repository<JobReportEntity>,
  ) {}

  async listPaginated(
    branchId: string,
    options: ReportListPaginatedOptions,
  ): Promise<{ data: JobReportEntity[]; total: number }> {
    const query = this.reportRepository
      .createQueryBuilder("report")
      .leftJoinAndSelect("report.orderLinks", "orderLink")
      .where("report.branchId = :branchId", { branchId })
      .orderBy("report.createdAt", "DESC");

    const [data, total] = await query
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();

    return { data, total };
  }

  findByIdAndBranch(
    id: string,
    branchId: string,
  ): Promise<JobReportEntity | null> {
    return this.reportRepository.findOne({
      where: { id, branchId },
      relations: ["orderLinks"],
    });
  }

  create(data: Partial<JobReportEntity>): Promise<JobReportEntity> {
    return this.reportRepository.save(this.reportRepository.create(data));
  }

  async softDelete(id: string): Promise<void> {
    await this.reportRepository.softDelete({ id });
  }
}
