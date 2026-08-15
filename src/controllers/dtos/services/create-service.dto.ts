import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({ example: "Corona de porcelana" })
  @IsString()
  name: string;

  @ApiProperty({ example: 25000, minimum: 0 })
  @IsInt()
  @Min(0)
  price: number;
}
