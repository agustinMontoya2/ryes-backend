import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({ example: "user@example.com or johndoe" })
  @IsString()
  credential: string;
}
