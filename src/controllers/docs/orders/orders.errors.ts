import { ResponseExceptionsEnum } from "@common/exceptions";

export const ordersErrors = {
  list: [ResponseExceptionsEnum.INVALID_INPUT],
  create: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.UNPROCESSABLE_ENTITY,
  ],
  get: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
  ],
  update: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
    ResponseExceptionsEnum.RESOURCE_ALREADY_EXISTS,
  ],
  remove: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
    ResponseExceptionsEnum.RESOURCE_ALREADY_EXISTS,
  ],
  complete: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
    ResponseExceptionsEnum.UNPROCESSABLE_ENTITY,
  ],
};
