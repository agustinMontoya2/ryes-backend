import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UuidParamDto {
  @ApiProperty({ description: "ID del recurso", format: "uuid" })
  @IsUUID()
  id: string;
}
