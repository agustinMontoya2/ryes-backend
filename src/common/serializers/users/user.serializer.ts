import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { BranchSerializer } from "../branches/branch.serializer";

export class UserSerializer {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @Expose()
  id: string;

  @ApiProperty({ example: "user@example.com" })
  @Expose()
  email: string;

  @ApiProperty({ example: "johndoe" })
  @Expose()
  username: string;

  @ApiProperty({ example: false })
  @Expose()
  isSuperAdmin: boolean;

  @ApiProperty({ type: [BranchSerializer] })
  @Expose()
  @Type(() => BranchSerializer)
  branches: BranchSerializer[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
