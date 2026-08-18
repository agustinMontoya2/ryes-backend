import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthLoginSerializer {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;
}
