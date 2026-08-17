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
  UNPROCESSABLE_ENTITY: defineResponseExceptionsDefinition(
    "Unprocessable entity",
    HttpStatus.UNPROCESSABLE_ENTITY,
    "Business rule violation",
  ),
  INTERNAL_SERVER_ERROR: defineResponseExceptionsDefinition(
    "Internal server error",
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  PATIENT_HAS_RELATED_ORDERS: defineResponseExceptionsDefinition(
    "The patient has related orders",
    HttpStatus.CONFLICT,
  ),
  DENTIST_HAS_RELATED_ORDERS: defineResponseExceptionsDefinition(
    "The dentist has related orders",
    HttpStatus.CONFLICT,
  ),
  SERVICE_HAS_RELATED_ORDERS: defineResponseExceptionsDefinition(
    "The service has related orders",
    HttpStatus.CONFLICT,
  ),
  DUE_DATE_LESS_THAN_DISPATCH_DATE: defineResponseExceptionsDefinition(
    "The due date cannot be earlier than the dispatch date.",
    HttpStatus.BAD_REQUEST,
  ),
  ORDER_NOT_PENDING: defineResponseExceptionsDefinition(
    "The order must have a pending status in order to complete it.",
    HttpStatus.BAD_REQUEST,
  ),
  ORDER_NOT_COMPLETED: defineResponseExceptionsDefinition(
    "The order must be completed to be added to a report",
    HttpStatus.UNPROCESSABLE_ENTITY,
  ),
  ORDER_ALREADY_IN_REPORT: defineResponseExceptionsDefinition(
    "The order is already associated with a report",
    HttpStatus.CONFLICT,
  ),
} satisfies Record<
  keyof typeof ResponseExceptionsEnum,
  IResponseExceptionsDefinition
>;
