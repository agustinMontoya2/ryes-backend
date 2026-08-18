import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthResetPasswordSerializer {
  @ApiProperty({ example: true })
  @Expose()
  success: boolean;
}
