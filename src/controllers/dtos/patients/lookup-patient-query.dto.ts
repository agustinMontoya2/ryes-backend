import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class LookupPatientQueryDto {
  @ApiProperty({ example: 35123456, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  dni: number;
}
