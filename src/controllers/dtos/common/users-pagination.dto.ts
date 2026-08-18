import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

import { PaginationDto } from "./pagination-dto";

export class UsersPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ description: "Include admin users in results", default: false })
  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  includeAdmins?: boolean = false;
}
