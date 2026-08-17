import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PatientEntity } from "../orm/entities";

const ORDER_BY_WHITELIST = [
  "fullname",
  "dni",
  "createdAt",
  "updatedAt",
] as const;

export interface ListPaginatedOptions {
  search?: string;
  page: number;
  limit: number;
  orderBy?: string;
  orderType?: string;
}

@Injectable()
export class PatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  async listPaginated(
    branchId: string,
    options: ListPaginatedOptions,
  ): Promise<{ data: PatientEntity[]; total: number }> {
    const query = this.patientRepository
      .createQueryBuilder("patient")
      .where("patient.branchId = :branchId", { branchId });

    if (options.search) {
      query.andWhere(
        "(patient.fullname ILIKE :search OR CAST(patient.dni AS text) ILIKE :search)",
        { search: `%${options.search}%` },
      );
    }

    const orderBy =
      options.orderBy !== undefined &&
      (ORDER_BY_WHITELIST as readonly string[]).includes(options.orderBy)
        ? options.orderBy
        : "createdAt";
    const orderType =
      options.orderType?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    query.orderBy(`patient.${orderBy}`, orderType);

    const [data, total] = await query
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();

    return { data, total };
  }

  findByIdAndBranch(
    id: string,
    branchId: string,
  ): Promise<PatientEntity | null> {
    return this.patientRepository.findOne({ where: { id, branchId } });
  }

  findByDniAndBranch(
    dni: number,
    branchId: string,
  ): Promise<PatientEntity | null> {
    return this.patientRepository.findOne({
      where: { dni, branchId },
    });
  }

  async restore(id: string): Promise<void> {
    await this.patientRepository.update({ id }, { deletedAt: null });
  }

  create(data: Partial<PatientEntity>): Promise<PatientEntity> {
    return this.patientRepository.save(this.patientRepository.create(data));
  }

  async update(id: string, data: Partial<PatientEntity>): Promise<void> {
    await this.patientRepository.update({ id }, data);
  }

  async softDelete(id: string): Promise<void> {
    await this.patientRepository.softDelete({ id });
  }
}
