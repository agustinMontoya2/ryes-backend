import { Injectable } from "@nestjs/common";

import { AppError } from "../common/exceptions/app-error.exception";
import { ResponseExceptionsEnum } from "../common/exceptions/response-exceptions.enum";
import { PaginationDto } from "../controllers/dtos/common";
import {
  CreateServiceDto,
  UpdateServiceDto,
} from "../controllers/dtos/services";
import {
  OrderRepository,
  ServiceRepository,
} from "../infrastructure/repositories";

import { buildPagination, type PaginatedResult } from "./pagination.helper";

import type { ServiceEntity } from "../infrastructure/orm/entities";

@Injectable()
export class ServicesService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async list(
    branchId: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<ServiceEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { data, total } = await this.serviceRepository.listPaginated(
      branchId,
      {
        search: query.search,
        page,
        limit,
        orderBy: query.orderBy,
        orderType: query.orderType,
      },
    );
    return { data, pagination: buildPagination(total, page, limit) };
  }

  async create(
    branchId: string,
    dto: CreateServiceDto,
  ): Promise<{ id: string }> {
    const service = await this.serviceRepository.create({
      branchId,
      name: dto.name,
      price: dto.price,
    });
    return { id: service.id };
  }

  async get(branchId: string, id: string): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findByIdAndBranch(id, branchId);
    if (!service) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "id",
      });
    }
    return service;
  }

  async getByName(branchId: string, name: string): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findByNameAndBranch(name, branchId);
    if (!service) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "name",
      });
    }
    return service;
  }

  async update(
    branchId: string,
    id: string,
    dto: UpdateServiceDto,
  ): Promise<{ id: string }> {
    const current = await this.get(branchId, id);
    await this.serviceRepository.update(id, {
      name: dto.name ?? current.name,
      price: dto.price ?? current.price,
    });
    return { id };
  }

  async remove(branchId: string, id: string): Promise<{ id: string }> {
    await this.get(branchId, id);
    const references = await this.orderRepository.countByServiceId(id, branchId);
    if (references > 0) {
      throw new AppError(ResponseExceptionsEnum.SERVICE_HAS_RELATED_ORDERS);
    }
    await this.serviceRepository.softDelete(id);
    return { id };
  }
}
