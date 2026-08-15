import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDentistDto {
  @ApiProperty({ example: "Roberto" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Sánchez" })
  @IsString()
  lastname: string;
}
