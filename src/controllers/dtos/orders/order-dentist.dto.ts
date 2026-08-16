import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class OrderDentistDto {
  @ApiPropertyOptional({ format: "uuid", description: "Id de odontólogo existente. Si no se envía, se upsertea por nombre y apellido" })
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
