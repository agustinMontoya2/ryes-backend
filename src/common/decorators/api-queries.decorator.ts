import { ApiQuery } from "@nestjs/swagger";

import type { ApiQueryOptions } from "@nestjs/swagger";

export function ApiQueries(...params: ApiQueryOptions[]): MethodDecorator {
  return (target, key, descriptor) => {
    for (const param of params) {
      ApiQuery(param)(target, key, descriptor);
    }
  };
}
