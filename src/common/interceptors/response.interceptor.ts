import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { map } from "rxjs/operators";

import { SUCCESS_METADATA_KEY, type SuccessMetadata } from "../decorators/success-metadata";

import type { Request, Response } from "express";
import type { Observable } from "rxjs";

function getApiPath(request: Request): string {
  const GLOBAL_PREFIX = "/api/v1";
  const url = (request.originalUrl ?? request.url).split("?")[0] ?? "";
  return url.startsWith(GLOBAL_PREFIX) ? url.slice(GLOBAL_PREFIX.length) : url;
}

interface SuccessEnvelope {
  statusCode: number;
  message: string;
  details: { path: string; timestamp: string };
  payload: unknown;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessEnvelope> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const success = this.reflector.getAllAndOverride<SuccessMetadata>(
      SUCCESS_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    return next.handle().pipe(
      map((payload) => {
        const data = success?.serializer
          ? plainToInstance(success.serializer, payload, {
              excludeExtraneousValues: true,
              exposeUnsetFields: false,
            })
          : payload;
        const statusCode = success?.statusCode ?? response.statusCode;
        response.status(statusCode);
        return {
          statusCode,
          message: success?.message ?? "Success",
          details: {
            path: getApiPath(request),
            timestamp: new Date().toISOString(),
          },
          payload: data,
        };
      }),
    );
  }
}
