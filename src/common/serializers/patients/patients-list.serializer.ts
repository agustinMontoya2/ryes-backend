import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { PaginationSerializer } from "../pagination.serializer";

import { PatientSerializer } from "./patient.serializer";

export class PatientsListSerializer {
  @ApiProperty({ type: () => [PatientSerializer] })
  @Expose()
  @Type(() => PatientSerializer)
  data: PatientSerializer[];

  @ApiProperty({ type: () => PaginationSerializer })
  @Expose()
  @Type(() => PaginationSerializer)
  pagination: PaginationSerializer;
}
