import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class DentistSerializer {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  branchId: string;

  @ApiProperty({ example: "Roberto" })
  @Expose()
  name: string;

  @ApiProperty({ example: "Sánchez" })
  @Expose()
  lastname: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
