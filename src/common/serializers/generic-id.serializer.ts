import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GenericIDSerializer {
  @ApiProperty({ example: "ea9dfb02-a542-4441-9ead-cfe23d237285" })
  @Expose()
  id: string;
}
