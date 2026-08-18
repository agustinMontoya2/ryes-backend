import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthRefreshSerializer {
  @ApiProperty()
  @Expose()
  accessToken: string;
}
