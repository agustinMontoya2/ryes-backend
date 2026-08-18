import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "user@example.com or johndoe" })
  @IsString()
  credential: string;

  @ApiProperty({ example: "securePassword123" })
  @IsString()
  password: string;
}
