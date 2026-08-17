import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { DentistEntity } from "../orm/entities";

import { type ListPaginatedOptions, resolveOrder } from "./repository.helpers";

const ORDER_BY_WHITELIST = [
  "name",
  "lastname",
  "createdAt",
  "updatedAt",
] as const;

@Injectable()
export class DentistRepository {
  constructor(
    @InjectRepository(DentistEntity)
    private readonly dentistRepository: Repository<DentistEntity>,
  ) {}

  async listPaginated(
    branchId: string,
    options: ListPaginatedOptions,
  ): Promise<{ data: DentistEntity[]; total: number }> {
    const query = this.dentistRepository
      .createQueryBuilder("dentist")
      .where("dentist.branchId = :branchId", { branchId });

    if (options.search) {
      query.andWhere(
        "(dentist.name ILIKE :search OR dentist.lastname ILIKE :search)",
        { search: `%${options.search}%` },
      );
    }

    const { column, direction } = resolveOrder(
      options.orderBy,
      options.orderType,
      ORDER_BY_WHITELIST,
    );
    query.orderBy(`dentist.${column}`, direction);

    const [data, total] = await query
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();

    return { data, total };
  }

  findByIdAndBranch(
    id: string,
    branchId: string,
  ): Promise<DentistEntity | null> {
    return this.dentistRepository.findOne({ where: { id, branchId } });
  }

  findByNameAndLastnameAndBranch(
    name: string,
    lastname: string,
    branchId: string,
  ): Promise<DentistEntity | null> {
    return this.dentistRepository.findOne({
      where: { name, lastname, branchId },
    });
  }

  create(data: Partial<DentistEntity>): Promise<DentistEntity> {
    return this.dentistRepository.save(this.dentistRepository.create(data));
  }

  async update(id: string, data: Partial<DentistEntity>): Promise<void> {
    await this.dentistRepository.update({ id }, data);
  }

  async softDelete(id: string): Promise<void> {
    await this.dentistRepository.softDelete({ id });
  }
}
