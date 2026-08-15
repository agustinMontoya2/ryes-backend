import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { PaginationSerializer } from "../pagination.serializer";

import { JobReportSerializer } from "./job-report.serializer";

export class ReportsListSerializer {
  @ApiProperty({ type: () => [JobReportSerializer] })
  @Expose()
  @Type(() => JobReportSerializer)
  data: JobReportSerializer[];

  @ApiProperty({ type: () => PaginationSerializer })
  @Expose()
  @Type(() => PaginationSerializer)
  pagination: PaginationSerializer;
}
