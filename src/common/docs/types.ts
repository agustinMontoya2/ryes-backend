import type { ClassConstructor } from "../decorators/success-metadata";
import type { ResponseExceptionsEnum } from "../exceptions/response-exceptions.enum";

export interface SuccessDefinition {
  message: string;
  statusCode?: number;
  serializer?: ClassConstructor;
}

export interface MethodApiDocs {
  success: SuccessDefinition;
  errors: ResponseExceptionsEnum[];
}

export type ControllerApiDocs<T> = Record<keyof T, MethodApiDocs>;
