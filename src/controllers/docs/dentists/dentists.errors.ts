import { ResponseExceptionsEnum } from "@common/exceptions";

export const dentistsErrors = {
  list: [ResponseExceptionsEnum.INVALID_INPUT],
  create: [ResponseExceptionsEnum.INVALID_INPUT],
  get: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
  ],
  update: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
  ],
  remove: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
    ResponseExceptionsEnum.RESOURCE_ALREADY_EXISTS,
  ],
};
