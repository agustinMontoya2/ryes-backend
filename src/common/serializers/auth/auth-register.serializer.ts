import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthRegisterSerializer {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @Expose()
  id: string;

  @ApiProperty({ example: "user@example.com" })
  @Expose()
  email: string;

  @ApiProperty({ example: "johndoe" })
  @Expose()
  username: string;
}
