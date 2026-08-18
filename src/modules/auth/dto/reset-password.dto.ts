import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @IsString()
  token: string;

  @ApiProperty({ example: "newSecurePassword123" })
  @IsString()
  @MinLength(8)
  password: string;
}
