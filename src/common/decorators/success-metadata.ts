export const SUCCESS_METADATA_KEY = "success_metadata";

export type ClassConstructor<T = unknown> = new (...args: unknown[]) => T;

export interface SuccessMetadata {
  message: string;
  statusCode: number;
  serializer?: ClassConstructor;
}
