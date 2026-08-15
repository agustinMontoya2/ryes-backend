import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { PaginationSerializer } from "../pagination.serializer";

import { ServiceSerializer } from "./service.serializer";

export class ServicesListSerializer {
  @ApiProperty({ type: () => [ServiceSerializer] })
  @Expose()
  @Type(() => ServiceSerializer)
  data: ServiceSerializer[];

  @ApiProperty({ type: () => PaginationSerializer })
  @Expose()
  @Type(() => PaginationSerializer)
  pagination: PaginationSerializer;
}
