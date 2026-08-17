import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { AppError, ResponseExceptionsEnum } from "@common/exceptions";
import {
  BRANCH_ID_HEADER,
  getBranchId,
  isValidBranchId,
} from "@common/helpers";

import { BranchRepository } from "../../infrastructure/repositories";

import type { Request } from "express";

@Injectable()
export class BranchExistsGuard implements CanActivate {
  constructor(private readonly branchRepository: BranchRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const branchId = getBranchId(request);
    if (!branchId || !isValidBranchId(branchId)) {
      throw new AppError(ResponseExceptionsEnum.INVALID_INPUT, {
        identifier: `Header ${BRANCH_ID_HEADER} debe ser un UUID válido`,
      });
    }

    const exists = await this.branchRepository.existsById(branchId);
    if (!exists) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        identifier: `Branch ${branchId} no existe`,
      });
    }

    return true;
  }
}
