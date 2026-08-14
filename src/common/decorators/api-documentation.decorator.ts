import { SetMetadata } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

import { responseExceptionsDefinition } from "../exceptions/response-exceptions.definition";

import { SUCCESS_METADATA_KEY, type SuccessMetadata } from "./success-metadata";

import type { ControllerApiDocs } from "../docs/types";

export function ApiDocumentation<T>(docs: ControllerApiDocs<T>): ClassDecorator {
  return (target) => {
    const prototype = target.prototype;

    const methods = Object.keys(docs) as Array<keyof T & string>;
    for (const method of methods) {
      const methodDocs = docs[method];
      const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
      if (!descriptor) {
        throw new Error(
          `@ApiDocumentation: method "${method}" not found on ${target.name}`,
        );
      }

      for (const code of methodDocs.errors) {
        const definition = responseExceptionsDefinition[code];
        ApiResponse({
          status: definition.statusCode,
          description: definition.description ?? definition.message,
        })(prototype, method, descriptor);
      }

      const success = methodDocs.success;
      const statusCode = success.statusCode ?? 200;
      if (success.serializer) {
        ApiExtraModels(success.serializer)(prototype, method, descriptor);
      }
      ApiResponse({
        status: statusCode,
        description: success.message,
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: statusCode },
            message: { type: "string", example: success.message },
            details: {
              type: "object",
              properties: {
                path: { type: "string" },
                timestamp: { type: "string", format: "date-time" },
              },
            },
            payload: success.serializer
              ? { $ref: getSchemaPath(success.serializer) }
              : { type: "object", example: {} },
          },
          required: ["statusCode", "message", "details", "payload"],
        },
      })(prototype, method, descriptor);

      SetMetadata(
        SUCCESS_METADATA_KEY,
        {
          message: success.message,
          statusCode,
          ...(success.serializer ? { serializer: success.serializer } : {}),
        } satisfies SuccessMetadata,
      )(prototype, method, descriptor);
    }
  };
}
