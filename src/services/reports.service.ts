import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { OrderStatusEnum } from "@common/enums/order-status.enum";
import { AppError, ResponseExceptionsEnum } from "@common/exceptions";

import { PaginationDto } from "../controllers/dtos/common";
import { CreateReportDto } from "../controllers/dtos/reports";
import { JobReportEntity, OrderEntity } from "../infrastructure/orm/entities";
import {
  JobReportOrderRepository,
  JobReportRepository,
  OrderRepository,
} from "../infrastructure/repositories";

import { buildPagination, type PaginatedResult } from "./pagination.helper";

@Injectable()
export class ReportsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jobReportRepository: JobReportRepository,
    private readonly jobReportOrderRepository: JobReportOrderRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async list(
    branchId: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<JobReportEntity>> {
    const { data, total } = await this.jobReportRepository.listPaginated(
      branchId,
      { page: query.page, limit: query.limit },
    );

    return { data, pagination: buildPagination(total, query.page, query.limit) };
  }

  async create(
    branchId: string,
    dto: CreateReportDto,
  ): Promise<{ id: string }> {
    const ordersFound = await Promise.all(
      dto.orderIds.map((orderId) =>
        this.orderRepository.findByIdAndBranch(orderId, branchId),
      ),
    );
    if (ordersFound.some((order) => !order)) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "orderId",
      });
    }
    const orders = ordersFound.filter((o): o is OrderEntity => o !== null);

    for (const order of orders) {
      if (order.status !== OrderStatusEnum.COMPLETED) {
        throw new AppError(ResponseExceptionsEnum.ORDER_NOT_COMPLETED);
      }
    }

    const alreadyInReport = await Promise.all(
      orders.map((order) =>
        this.jobReportOrderRepository.existsByOrderId(order.id),
      ),
    );
    const duplicatedIndex = alreadyInReport.findIndex((exists) => exists);
    if (duplicatedIndex !== -1) {
      throw new AppError(ResponseExceptionsEnum.ORDER_ALREADY_IN_REPORT);
    }

    const totalPrice = orders.reduce(
      (total, order) =>
        total +
        order.services.reduce(
          (servicesTotal, service) => servicesTotal + service.price,
          0,
        ),
      0,
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const report = await this.jobReportRepository.create({
        branchId,
        deliveryDate: new Date(dto.deliveryDate),
        totalPrice,
      });

      await Promise.all(
        orders.map((order) => {
          const snapshot = {
            id: order.id,
            patient: order.patient,
            dentist: order.dentist,
            services: order.services,
            dispatchDate: order.dispatchDate,
            dueDate: order.dueDate,
            lab: order.lab,
            status: order.status,
          };
          return this.jobReportOrderRepository.create({
            jobReport: report,
            order,
            orderSnapshot: snapshot,
          });
        }),
      );

      await Promise.all(
        orders.map((order) =>
          this.orderRepository.setStatus(order.id, OrderStatusEnum.SUBMITTED),
        ),
      );

      await queryRunner.commitTransaction();
      return { id: report.id };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async get(branchId: string, id: string): Promise<JobReportEntity> {
    const report = await this.jobReportRepository.findByIdAndBranch(
      id,
      branchId,
    );
    if (!report) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "id",
      });
    }
    return report;
  }

  async remove(branchId: string, id: string): Promise<{ id: string }> {
    await this.get(branchId, id);
    await this.jobReportRepository.softDelete(id);
    return { id };
  }
}
