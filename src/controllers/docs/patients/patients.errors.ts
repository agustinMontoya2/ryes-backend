import { ResponseExceptionsEnum } from "@common/exceptions";

export const patientsErrors = {
  list: [ResponseExceptionsEnum.INVALID_INPUT],
  lookup: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_NOT_FOUND,
  ],
  create: [
    ResponseExceptionsEnum.INVALID_INPUT,
    ResponseExceptionsEnum.RESOURCE_ALREADY_EXISTS,
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
};
