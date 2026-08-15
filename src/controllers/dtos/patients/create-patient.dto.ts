import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class CreatePatientDto {
  @ApiProperty({ example: "María González" })
  @IsString()
  fullname: string;

  @ApiProperty({ example: 35123456, minimum: 1 })
  @IsInt()
  @Min(1)
  dni: number;
}
