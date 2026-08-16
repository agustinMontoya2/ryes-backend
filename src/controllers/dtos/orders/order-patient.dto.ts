import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class OrderPatientDto {
  @ApiPropertyOptional({ format: "uuid", description: "Id de paciente existente. Si no se envía, se upsertea por DNI" })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ example: "María González" })
  @IsString()
  fullname: string;

  @ApiProperty({ example: 35123456, minimum: 1 })
  @IsInt()
  @Min(1)
  dni: number;
}
