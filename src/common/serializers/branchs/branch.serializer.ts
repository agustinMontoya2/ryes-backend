import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BranchSerializer {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ example: "Talar" })
  @Expose()
  location: string;
}
