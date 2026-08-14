import type { ApiParamOptions } from "@nestjs/swagger";

const UUID_EXAMPLE = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

export function uuidParam(resource: string): ApiParamOptions {
  return {
    name: "id",
    description: `${resource} UUID`,
    example: UUID_EXAMPLE,
  };
}

export function slugParam(resource: string, example: string): ApiParamOptions {
  return {
    name: "slug",
    description: `${resource} slug`,
    example,
  };
}
