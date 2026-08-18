import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { AppError, ResponseExceptionsEnum } from "@common/exceptions";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.isSuperAdmin) {
      throw new AppError(ResponseExceptionsEnum.USER_NOT_ADMIN);
    }

    return true;
  }
}
