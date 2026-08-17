import { Injectable } from "@nestjs/common";

import { AppError } from "../common/exceptions/app-error.exception";
import { ResponseExceptionsEnum } from "../common/exceptions/response-exceptions.enum";
import { PaginationDto } from "../controllers/dtos/common";
import {
  CreatePatientDto,
  UpdatePatientDto,
} from "../controllers/dtos/patients";
import {
  OrderRepository,
  PatientRepository,
} from "../infrastructure/repositories";

import { buildPagination, type PaginatedResult } from "./pagination.helper";

import type { PatientEntity } from "../infrastructure/orm/entities";

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async list(
    branchId: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<PatientEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { data, total } = await this.patientRepository.listPaginated(
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

  async lookup(branchId: string, dni: number): Promise<PatientEntity> {
    const patient = await this.patientRepository.findByDniAndBranch(
      dni,
      branchId,
    );
    if (!patient) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "dni",
      });
    }
    return patient;
  }

  async create(
    branchId: string,
    dto: CreatePatientDto,
  ): Promise<{ id: string }> {
    const existing = await this.patientRepository.findByDniAndBranch(
      dto.dni,
      branchId,
    );
    if (existing) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_ALREADY_EXISTS, {
        property: "dni",
      });
    }
    const patient = await this.patientRepository.create({
      branchId,
      fullname: dto.fullname,
      dni: dto.dni,
    });
    return { id: patient.id };
  }

  async get(branchId: string, id: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findByIdAndBranch(
      id,
      branchId,
    );
    if (!patient) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "id",
      });
    }
    return patient;
  }

  async update(
    branchId: string,
    id: string,
    dto: UpdatePatientDto,
  ): Promise<{ id: string }> {
    const current = await this.get(branchId, id);
    if (!current) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "id",
      });
    }
    if (dto.dni !== undefined) {
      const conflicting = await this.patientRepository.findByDniAndBranch(
        dto.dni,
        branchId,
      );
      if (conflicting && conflicting.id !== id) {
        throw new AppError(ResponseExceptionsEnum.RESOURCE_ALREADY_EXISTS, {
          property: "id",
        });
      }
    }
    await this.patientRepository.update(id, {
      fullname: dto.fullname ?? current.fullname,
      dni: dto.dni ?? current.dni,
    });
    return { id };
  }

  async remove(branchId: string, id: string): Promise<{ id: string }> {
    await this.get(branchId, id);
    const references = await this.orderRepository.countByPatientId(
      id,
      branchId,
    );
    if (references > 0) {
      throw new AppError(ResponseExceptionsEnum.PATIENT_HAS_RELATED_ORDERS);
    }
    await this.patientRepository.softDelete(id);
    return { id };
  }

  // async upsertForOrder(
  //   branchId: string,
  //   data: { fullname: string; dni: number },
  // ): Promise<string> {
  //   const existing = await this.patientRepository.findByDniAndBranch(
  //     data.dni,
  //     branchId,
  //     { withDeleted: true },
  //   );
  //   if (existing) {
  //     if (existing.deletedAt) {
  //       await this.patientRepository.restore(existing.id);
  //     }
  //     await this.patientRepository.update(existing.id, {
  //       fullname: data.fullname,
  //     });
  //     return existing.id;
  //   }
  //   const patient = await this.patientRepository.create({ branchId, ...data });
  //   return patient.id;
  // }
}
