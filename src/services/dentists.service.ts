import { Injectable } from "@nestjs/common";

import { AppError, ResponseExceptionsEnum } from "@common/exceptions";

import { PaginationDto } from "../controllers/dtos/common";
import {
  CreateDentistDto,
  UpdateDentistDto,
} from "../controllers/dtos/dentists";
import {
  DentistRepository,
  OrderRepository,
} from "../infrastructure/repositories";

import { buildPagination, type PaginatedResult } from "./pagination.helper";

import type { DentistEntity } from "../infrastructure/orm/entities";

@Injectable()
export class DentistsService {
  constructor(
    private readonly dentistRepository: DentistRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async list(
    branchId: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<DentistEntity>> {
    const { data, total } = await this.dentistRepository.listPaginated(
      branchId,
      {
        search: query.search,
        page: query.page,
        limit: query.limit,
        orderBy: query.orderBy,
        orderType: query.orderType,
      },
    );
    return { data, pagination: buildPagination(total, query.page, query.limit) };
  }

  async create(
    branchId: string,
    dto: CreateDentistDto,
  ): Promise<{ id: string }> {
    const dentist = await this.dentistRepository.create({
      branchId,
      name: dto.name,
      lastname: dto.lastname,
    });
    return { id: dentist.id };
  }

  async get(branchId: string, id: string): Promise<DentistEntity> {
    const dentist = await this.dentistRepository.findByIdAndBranch(
      id,
      branchId,
    );
    if (!dentist) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "id",
      });
    }
    return dentist;
  }

  async update(
    branchId: string,
    id: string,
    dto: UpdateDentistDto,
  ): Promise<{ id: string }> {
    const current = await this.get(branchId, id);
    await this.dentistRepository.update(id, {
      name: dto.name ?? current.name,
      lastname: dto.lastname ?? current.lastname,
    });
    return { id };
  }

  async remove(branchId: string, id: string): Promise<{ id: string }> {
    await this.get(branchId, id);
    const references = await this.orderRepository.countByDentistId(
      id,
      branchId,
    );
    if (references > 0) {
      throw new AppError(ResponseExceptionsEnum.DENTIST_HAS_RELATED_ORDERS);
    }
    await this.dentistRepository.softDelete(id);
    return { id };
  }
}
