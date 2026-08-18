import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { PaginationSerializer } from "../pagination.serializer";

import { UserSerializer } from "./user.serializer";

export class UsersListSerializer {
  @ApiProperty({ type: [UserSerializer] })
  @Expose()
  @Type(() => UserSerializer)
  data: UserSerializer[];

  @ApiProperty({ type: PaginationSerializer })
  @Expose()
  @Type(() => PaginationSerializer)
  pagination: PaginationSerializer;
}
