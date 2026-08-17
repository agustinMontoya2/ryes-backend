import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

import { AppError } from "../exceptions/app-error.exception";
import { ResponseExceptionsEnum } from "../exceptions/response-exceptions.enum";
import { BRANCH_ID_HEADER, getBranchId, isValidBranchId } from "../helpers/branch-id";

import type { Request } from "express";

const branchId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const branchId = getBranchId(request);
    if (!branchId || !isValidBranchId(branchId)) {
      throw new AppError(ResponseExceptionsEnum.INVALID_INPUT, {
        identifier: `Header ${BRANCH_ID_HEADER} debe ser un UUID válido`,
      });
    }
    return branchId;
  },
);

export { branchId as BranchId };
