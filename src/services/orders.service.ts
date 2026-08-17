import { Injectable } from "@nestjs/common";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import { AppError } from "../common/exceptions/app-error.exception";
import { ResponseExceptionsEnum } from "../common/exceptions/response-exceptions.enum";
import { PaginationDto } from "../controllers/dtos/common";
import { CreateOrderDto, UpdateOrderDto } from "../controllers/dtos/orders";
import {
  DentistRepository,
  OrderRepository,
  PatientRepository,
  ServiceRepository,
} from "../infrastructure/repositories";

import { buildPagination, type PaginatedResult } from "./pagination.helper";

import type {
  OrderEntity,
  ServiceEntity,
} from "../infrastructure/orm/entities";

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly patientRepository: PatientRepository,
    private readonly dentistRepository: DentistRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async list(
    branchId: string,
    query: PaginationDto & { status?: OrderStatusEnum },
  ): Promise<PaginatedResult<OrderEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { data, total } = await this.orderRepository.listPaginated(branchId, {
      page,
      limit,
      status: query.status,
    });
    return { data, pagination: buildPagination(total, page, limit) };
  }

  async create(branchId: string, dto: CreateOrderDto): Promise<{ id: string }> {
    if (dto.dueDate < dto.dispatchDate) {
      throw new AppError(
        ResponseExceptionsEnum.DUE_DATE_LESS_THAN_DISPATCH_DATE,
      );
    }

    const patient = await this.resolvePatient(branchId, dto.patient);
    const dentist = await this.resolveDentist(branchId, dto.dentist);

    const servicesFound = await Promise.all(
      dto.serviceIds.map((serviceId) =>
        this.serviceRepository.findByIdAndBranch(serviceId, branchId),
      ),
    );
    if (servicesFound.some((service) => !service)) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "serviceId",
      });
    }
    const services = servicesFound.filter(
      (s): s is ServiceEntity => s !== null,
    );

    const order = await this.orderRepository.create({
      branchId,
      patient,
      dentist,
      services,
      dispatchDate: new Date(dto.dispatchDate),
      dueDate: new Date(dto.dueDate),
      lab: dto.lab ?? null,
    });
    return { id: order.id };
  }

  async get(branchId: string, id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findByIdAndBranch(id, branchId);
    if (!order) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "id",
      });
    }
    return order;
  }

  async update(
    branchId: string,
    id: string,
    dto: UpdateOrderDto,
  ): Promise<{ id: string }> {
    await this.get(branchId, id);

    const data: Partial<OrderEntity> = {};

    if (dto.dispatchDate) {
      data.dispatchDate = new Date(dto.dispatchDate);
    }
    if (dto.dueDate) {
      data.dueDate = new Date(dto.dueDate);
    }
    if (data.dispatchDate || data.dueDate) {
      const current = await this.orderRepository.findByIdAndBranch(
        id,
        branchId,
      );
      const dispatch = data.dispatchDate ?? current!.dispatchDate;
      const due = data.dueDate ?? current!.dueDate;
      if (due < dispatch) {
        throw new AppError(ResponseExceptionsEnum.UNPROCESSABLE_ENTITY);
      }
    }

    if (dto.lab !== undefined) {
      data.lab = dto.lab ?? null;
    }

    if (dto.patient) {
      data.patient = await this.resolvePatient(branchId, dto.patient);
    }

    if (dto.dentist) {
      data.dentist = await this.resolveDentist(branchId, dto.dentist);
    }

    if (dto.serviceIds) {
      const servicesFound = await Promise.all(
        dto.serviceIds.map((serviceId) =>
          this.serviceRepository.findByIdAndBranch(serviceId, branchId),
        ),
      );
      if (servicesFound.some((service) => !service)) {
        throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
          property: "serviceId",
        });
      }
      data.services = servicesFound.filter(
        (s): s is ServiceEntity => s !== null,
      );
    }

    await this.orderRepository.update(id, data);
    return { id };
  }

  async remove(branchId: string, id: string): Promise<{ id: string }> {
    await this.get(branchId, id);
    await this.orderRepository.softDelete(id);
    return { id };
  }

  async complete(branchId: string, id: string): Promise<{ id: string }> {
    const order = await this.get(branchId, id);
    if (order.status !== OrderStatusEnum.PENDING) {
      throw new AppError(ResponseExceptionsEnum.ORDER_NOT_PENDING);
    }
    await this.orderRepository.setStatus(id, OrderStatusEnum.COMPLETED);
    return { id };
  }

  private async resolvePatient(
    branchId: string,
    data: { id?: string; fullname: string; dni: number },
  ) {
    if (data.id) {
      const patient = await this.patientRepository.findByIdAndBranch(
        data.id,
        branchId,
      );
      if (!patient) {
        throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
          property: "patientId",
        });
      }
      return patient;
    }

    const existing = await this.patientRepository.findByDniAndBranch(
      data.dni,
      branchId,
    );
    if (existing) {
      return existing;
    }

    const created = await this.patientRepository.create({
      branchId,
      fullname: data.fullname,
      dni: data.dni,
    });
    return created;
  }

  private async resolveDentist(
    branchId: string,
    data: { id?: string; name: string; lastname: string },
  ) {
    if (data.id) {
      const dentist = await this.dentistRepository.findByIdAndBranch(
        data.id,
        branchId,
      );
      if (!dentist) {
        throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
          property: "dentistId",
        });
      }
      return dentist;
    }

    const existing =
      await this.dentistRepository.findByNameAndLastnameAndBranch(
        data.name,
        data.lastname,
        branchId,
      );
    if (existing) {
      return existing;
    }

    const created = await this.dentistRepository.create({
      branchId,
      name: data.name,
      lastname: data.lastname,
    });
    return created;
  }
}
