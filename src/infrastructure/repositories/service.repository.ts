import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ServiceEntity } from "../orm/entities";

const ORDER_BY_WHITELIST = [
  "name",
  "price",
  "createdAt",
  "updatedAt",
] as const;

export interface ServiceListPaginatedOptions {
  search?: string;
  page: number;
  limit: number;
  orderBy?: string;
  orderType?: string;
}

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async listPaginated(
    branchId: string,
    options: ServiceListPaginatedOptions,
  ): Promise<{ data: ServiceEntity[]; total: number }> {
    const query = this.serviceRepository
      .createQueryBuilder("service")
      .where("service.branchId = :branchId", { branchId });

    if (options.search) {
      query.andWhere("(service.name ILIKE :search)", {
        search: `%${options.search}%`,
      });
    }

    const orderBy =
      options.orderBy !== undefined &&
      (ORDER_BY_WHITELIST as readonly string[]).includes(options.orderBy)
        ? options.orderBy
        : "createdAt";
    const orderType =
      options.orderType?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    query.orderBy(`service.${orderBy}`, orderType);

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
