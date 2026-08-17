import {
  BadRequestException,
  Catch,
  HttpException,
  Logger,
} from "@nestjs/common";

import { getApiPath } from "../helpers/api-path";

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

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = getApiPath(request);

    if (exception instanceof AppError) {
      this.logger.warn(
        `[${exception.errorCode}] ${path} - ${exception.message}`,
      );
    } else {
      this.logger.error(
        `Unhandled exception at ${path}`,
        exception instanceof Error ? exception.stack : exception,
      );
    }

    const envelope = this.toEnvelope(exception, path);
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
