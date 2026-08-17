import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import { OrderEntity } from "../orm/entities";

import { type ListPaginatedOptions } from "./repository.helpers";

export interface OrderListPaginatedOptions extends ListPaginatedOptions {
  status?: OrderStatusEnum;
}

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async listPaginated(
    branchId: string,
    options: OrderListPaginatedOptions,
  ): Promise<{ data: OrderEntity[]; total: number }> {
    const query = this.orderRepository
      .createQueryBuilder("o")
      .leftJoinAndSelect("o.patient", "patient")
      .leftJoinAndSelect("o.dentist", "dentist")
      .leftJoinAndSelect("o.services", "service")
      .where("o.branchId = :branchId", { branchId });

    if (options.status) {
      query.andWhere("o.status = :status", { status: options.status });
    }

    query.orderBy("o.createdAt", "DESC");

    const [data, total] = await query
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .getManyAndCount();

    return { data, total };
  }

  findByIdAndBranch(
    id: string,
    branchId: string,
  ): Promise<OrderEntity | null> {
    return this.orderRepository.findOne({
      where: { id, branchId },
      relations: ["patient", "dentist", "services"],
    });
  }

  create(data: Partial<OrderEntity>): Promise<OrderEntity> {
    return this.orderRepository.save(this.orderRepository.create(data));
  }

  async update(id: string, data: Partial<OrderEntity>): Promise<void> {
    await this.orderRepository.save(this.orderRepository.merge(
      this.orderRepository.create({ id }),
      data,
    ));
  }

  async softDelete(id: string): Promise<void> {
    await this.orderRepository.softDelete({ id });
  }

  async setStatus(
    id: string,
    status: OrderStatusEnum,
  ): Promise<void> {
    await this.orderRepository.update({ id }, { status });
  }

  countByPatientId(patientId: string, branchId: string): Promise<number> {
    return this.orderRepository
      .createQueryBuilder("o")
      .innerJoin("o.patient", "patient")
      .where("o.branchId = :branchId", { branchId })
      .andWhere("patient.id = :patientId", { patientId })
      .getCount();
  }

  countByDentistId(dentistId: string, branchId: string): Promise<number> {
    return this.orderRepository
      .createQueryBuilder("o")
      .innerJoin("o.dentist", "dentist")
      .where("o.branchId = :branchId", { branchId })
      .andWhere("dentist.id = :dentistId", { dentistId })
      .getCount();
  }

  countByServiceId(serviceId: string, branchId: string): Promise<number> {
    return this.orderRepository
      .createQueryBuilder("o")
      .innerJoin("o.services", "service")
      .where("o.branchId = :branchId", { branchId })
      .andWhere("service.id = :serviceId", { serviceId })
      .getCount();
  }
}
