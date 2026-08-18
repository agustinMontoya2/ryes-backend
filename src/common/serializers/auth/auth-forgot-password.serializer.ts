import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthForgotPasswordSerializer {
  @ApiProperty({ nullable: true })
  @Expose()
  resetToken: string | null;
}
