import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

import { AppError } from "../exceptions/app-error.exception";
import { ResponseExceptionsEnum } from "../exceptions/response-exceptions.enum";

import type { Request } from "express";

const BRANCH_ID_HEADER = "x-branch-id";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const branchId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const branchId = request.headers[BRANCH_ID_HEADER];
    if (typeof branchId !== "string" || !UUID_PATTERN.test(branchId)) {
      throw new AppError(ResponseExceptionsEnum.INVALID_INPUT, {
        identifier: `Header ${BRANCH_ID_HEADER} debe ser un UUID válido`,
      });
    }
    return branchId;
  },
);

export { branchId as BranchId };
