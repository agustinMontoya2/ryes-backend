import type { ControllerApiDocs, SuccessDefinition } from "./types";
import type { ResponseExceptionsEnum } from "../exceptions/response-exceptions.enum";

export function combineDocs<T>(
  success: Record<keyof T, SuccessDefinition>,
  errors: Record<keyof T, ResponseExceptionsEnum[]>,
): ControllerApiDocs<T> {
  const entries = Object.keys(success).map((method) => {
    const key = method as keyof T;
    return [key, { success: success[key], errors: errors[key] }];
  });
  return Object.fromEntries(entries) as ControllerApiDocs<T>;
}
