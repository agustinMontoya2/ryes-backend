import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ServiceEntity } from "../orm/entities";

import { type ListPaginatedOptions, resolveOrder } from "./repository.helpers";

const ORDER_BY_WHITELIST = [
  "name",
  "price",
  "createdAt",
  "updatedAt",
] as const;

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async listPaginated(
    branchId: string,
    options: ListPaginatedOptions,
  ): Promise<{ data: ServiceEntity[]; total: number }> {
    const query = this.serviceRepository
      .createQueryBuilder("service")
      .where("service.branchId = :branchId", { branchId });

    if (options.search) {
      query.andWhere("(service.name ILIKE :search)", {
        search: `%${options.search}%`,
      });
    }

    const { column, direction } = resolveOrder(
      options.orderBy,
      options.orderType,
      ORDER_BY_WHITELIST,
    );
    query.orderBy(`service.${column}`, direction);

    const [data, total] = await query
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();

    return { data, total };
  }

  findByIdAndBranch(
    id: string,
    branchId: string,
  ): Promise<ServiceEntity | null> {
    return this.serviceRepository.findOne({ where: { id, branchId } });
  }

  findByNameAndBranch(
    name: string,
    branchId: string,
  ): Promise<ServiceEntity | null> {
    return this.serviceRepository.findOne({ where: { name, branchId } });
  }

  create(data: Partial<ServiceEntity>): Promise<ServiceEntity> {
    return this.serviceRepository.save(this.serviceRepository.create(data));
  }

  async update(id: string, data: Partial<ServiceEntity>): Promise<void> {
    await this.serviceRepository.update({ id }, data);
  }

  async softDelete(id: string): Promise<void> {
    await this.serviceRepository.softDelete({ id });
  }
}
