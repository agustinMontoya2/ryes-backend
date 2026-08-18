import { ResponseExceptionsEnum } from "@common/exceptions";

export const usersErrors = {
  list: [ResponseExceptionsEnum.VALIDATION_ERROR],
  getMe: [ResponseExceptionsEnum.RESOURCE_NOT_FOUND],
  assignBranches: [
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
    ResponseExceptionsEnum.VALIDATION_ERROR,
    ResponseExceptionsEnum.CANNOT_ASSIGN_BRANCHES_TO_SUPER_ADMIN,
  ],
};
