import type { Request } from "express";

const GLOBAL_PREFIX = "/api/v1";

export function getApiPath(request: Request): string {
  const url = (request.originalUrl ?? request.url).split("?")[0] ?? "";
  return url.startsWith(GLOBAL_PREFIX) ? url.slice(GLOBAL_PREFIX.length) : url;
}
