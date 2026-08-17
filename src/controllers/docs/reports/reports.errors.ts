import { ResponseExceptionsEnum } from "@common/exceptions";

export const reportsErrors = {
  list: [ResponseExceptionsEnum.INVALID_INPUT],
  create: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
    ResponseExceptionsEnum.ORDER_NOT_COMPLETED,
    ResponseExceptionsEnum.ORDER_ALREADY_IN_REPORT,
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
