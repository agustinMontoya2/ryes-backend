import { HttpStatus } from "@nestjs/common";

import type { ResponseExceptionsEnum } from "./response-exceptions.enum";

interface IResponseExceptionsDefinition {
  statusCode: number | HttpStatus;
  message: string;
  description?: string;
}

function defineResponseExceptionsDefinition(
  message: string,
  statusCode: HttpStatus,
  description?: string,
): IResponseExceptionsDefinition {
  return {
    message,
    statusCode,
    description: description ?? message,
  };
}

export const responseExceptionsDefinition = {
  RESOURCE_NOT_FOUND: defineResponseExceptionsDefinition(
    "Resource not found",
    HttpStatus.NOT_FOUND,
  ),
  RESOURCE_ALREADY_EXISTS: defineResponseExceptionsDefinition(
    "Resource already exists",
    HttpStatus.CONFLICT,
  ),
  UNAUTHORIZED: defineResponseExceptionsDefinition(
    "Unauthorized access",
    HttpStatus.UNAUTHORIZED,
  ),
  INVALID_INPUT: defineResponseExceptionsDefinition(
    "Invalid input",
    HttpStatus.BAD_REQUEST,
  ),
  VALIDATION_ERROR: defineResponseExceptionsDefinition(
    "Validation error",
    HttpStatus.BAD_REQUEST,
  ),
  INTERNAL_SERVER_ERROR: defineResponseExceptionsDefinition(
    "Internal server error",
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
} satisfies Record<
  keyof typeof ResponseExceptionsEnum,
  IResponseExceptionsDefinition
>;
