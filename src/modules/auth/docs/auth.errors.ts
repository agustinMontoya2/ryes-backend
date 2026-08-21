import { ResponseExceptionsEnum } from "@common/exceptions";

export const authErrors = {
  register: [
    ResponseExceptionsEnum.USER_ALREADY_EXISTS,
    ResponseExceptionsEnum.VALIDATION_ERROR,
  ],
  login: [
    ResponseExceptionsEnum.INVALID_CREDENTIALS,
    ResponseExceptionsEnum.VALIDATION_ERROR,
  ],
  forgotPassword: [ResponseExceptionsEnum.VALIDATION_ERROR],
  resetPassword: [
    ResponseExceptionsEnum.INVALID_RESET_TOKEN,
    ResponseExceptionsEnum.PASSWORD_SAME_AS_CURRENT,
    ResponseExceptionsEnum.VALIDATION_ERROR,
  ],
  refresh: [
    ResponseExceptionsEnum.INVALID_CREDENTIALS,
    ResponseExceptionsEnum.VALIDATION_ERROR,
  ],
};
