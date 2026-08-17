import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class DentistOrderDto {
  @ApiPropertyOptional({ format: "uuid", description: "Si se pasa, se usa el odontólogo existente" })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ example: "Roberto" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Sánchez" })
  @IsString()
  lastname: string;
}
