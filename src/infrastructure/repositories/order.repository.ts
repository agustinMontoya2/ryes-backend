import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import { OrderEntity } from "../orm/entities";

export interface OrderListPaginatedOptions {
  page: number;
  limit: number;
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
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.patient", "patient")
      .leftJoinAndSelect("order.dentist", "dentist")
      .leftJoinAndSelect("order.services", "service")
      .where("order.branchId = :branchId", { branchId });

    if (options.status) {
      query.andWhere("order.status = :status", { status: options.status });
    }

    query.orderBy("order.createdAt", "DESC");

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
    const { services, ...rest } = data;
    await this.orderRepository.update({ id }, rest);
    if (services) {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (order) {
        order.services = services;
        await this.orderRepository.save(order);
      }
    }
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
      .createQueryBuilder("order")
      .innerJoin("order.patient", "patient")
      .where("order.branchId = :branchId", { branchId })
      .andWhere("patient.id = :patientId", { patientId })
      .getCount();
  }

  countByDentistId(dentistId: string, branchId: string): Promise<number> {
    return this.orderRepository
      .createQueryBuilder("order")
      .innerJoin("order.dentist", "dentist")
      .where("order.branchId = :branchId", { branchId })
      .andWhere("dentist.id = :dentistId", { dentistId })
      .getCount();
  }

  countByServiceId(serviceId: string, branchId: string): Promise<number> {
    return this.orderRepository
      .createQueryBuilder("order")
      .innerJoin("order.services", "service")
      .where("order.branchId = :branchId", { branchId })
      .andWhere("service.id = :serviceId", { serviceId })
      .getCount();
  }
}
