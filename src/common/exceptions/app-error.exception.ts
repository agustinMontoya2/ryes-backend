import { HttpException } from "@nestjs/common";

import { responseExceptionsDefinition } from "./response-exceptions.definition";

import type { ResponseExceptionsEnum } from "./response-exceptions.enum";

export class AppError extends HttpException {
  readonly errorCode: ResponseExceptionsEnum;
  readonly metadata: Record<string, unknown>;

  constructor(
    errorCode: ResponseExceptionsEnum,
    metadata: Record<string, unknown> = {},
  ) {
    const errorDefinition = responseExceptionsDefinition[errorCode];
    const data: Record<string, unknown> = {};
    if (metadata && typeof metadata === "object") {
      Object.assign(data, metadata);
    }

    super(
      {
        code: errorCode,
        message: errorDefinition.message,
        identifier: errorDefinition.description,
        ...data,
      },
      errorDefinition.statusCode,
    );
    this.errorCode = errorCode;
    this.metadata = metadata;
  }
}
