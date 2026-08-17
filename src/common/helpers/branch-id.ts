import type { Request } from "express";

export const BRANCH_ID_HEADER = "x-branch-id";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function getBranchId(request: Request): string | undefined {
  const value = request.headers[BRANCH_ID_HEADER];
  return typeof value === "string" ? value : undefined;
}

export function isValidBranchId(value: string): boolean {
  return UUID_PATTERN.test(value);
}
