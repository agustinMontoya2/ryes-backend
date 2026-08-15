import { ResponseExceptionsEnum } from "@common/exceptions";

export const reportsErrors = {
  list: [ResponseExceptionsEnum.INVALID_INPUT],
  create: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.UNPROCESSABLE_ENTITY,
  ],
  get: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
  ],
  remove: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
  ],
};
