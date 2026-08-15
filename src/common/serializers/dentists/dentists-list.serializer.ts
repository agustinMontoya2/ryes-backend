import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { PaginationSerializer } from "../pagination.serializer";

import { DentistSerializer } from "./dentist.serializer";

export class DentistsListSerializer {
  @ApiProperty({ type: () => [DentistSerializer] })
  @Expose()
  @Type(() => DentistSerializer)
  data: DentistSerializer[];

  @ApiProperty({ type: () => PaginationSerializer })
  @Expose()
  @Type(() => PaginationSerializer)
  pagination: PaginationSerializer;
}
