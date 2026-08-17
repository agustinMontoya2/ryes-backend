import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class PatientOrderDto {
  @ApiPropertyOptional({ format: "uuid", description: "Si se pasa, se usa el paciente existente" })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ example: "Agustin Montoya" })
  @IsString()
  fullname: string;

  @ApiProperty({ example: 4346456 })
  @IsInt()
  @Min(1)
  dni: number;
}
