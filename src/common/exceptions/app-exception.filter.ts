import { BadRequestException, Catch, HttpException } from "@nestjs/common";

import { AppError } from "./app-error.exception";

import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { Request, Response } from "express";

interface ErrorEnvelope {
  statusCode: number;
  errorCode: string;
  message: string;
  details: { path: string; timestamp: string };
  metadata: Record<string, unknown>;
}

function getApiPath(request: Request): string {
  const GLOBAL_PREFIX = "/api/v1";
  const url = (request.originalUrl ?? request.url).split("?")[0] ?? "";
  return url.startsWith(GLOBAL_PREFIX) ? url.slice(GLOBAL_PREFIX.length) : url;
}

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const envelope = this.toEnvelope(exception, getApiPath(request));
    response.status(envelope.statusCode).json(envelope);
  }

  private toEnvelope(exception: unknown, path: string): ErrorEnvelope {
    if (exception instanceof AppError) {
      return {
        statusCode: exception.getStatus(),
        errorCode: exception.errorCode,
        message: exception.message,
        details: { path, timestamp: new Date().toISOString() },
        metadata: exception.metadata,
      };
    }
    if (exception instanceof BadRequestException) {
      const body = exception.getResponse() as Record<string, unknown>;
      const rawMessage = body.message;
      const properties = Array.isArray(rawMessage)
        ? rawMessage.filter((item): item is string => typeof item === "string")
        : [];
      return {
        statusCode: 400,
        errorCode: "VALIDATION_ERROR",
        message: "Invalid body.",
        details: { path, timestamp: new Date().toISOString() },
        metadata: { properties },
      };
    }
    if (exception instanceof HttpException) {
      return {
        statusCode: exception.getStatus(),
        errorCode: this.toErrorCode(exception.getStatus()),
        message: exception.message,
        details: { path, timestamp: new Date().toISOString() },
        metadata: {},
      };
    }
    return {
      statusCode: 500,
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
      details: { path, timestamp: new Date().toISOString() },
      metadata: {},
    };
  }

  private toErrorCode(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "VALIDATION_ERROR";
      case 401:
        return "UNAUTHORIZED";
      case 404:
        return "RESOURCE_NOT_FOUND";
      case 409:
        return "RESOURCE_ALREADY_EXISTS";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  }
}
