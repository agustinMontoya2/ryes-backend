import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ServiceSerializer {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  branchId: string;

  @ApiProperty({ example: "Corona de porcelana" })
  @Expose()
  name: string;

  @ApiProperty({ example: 25000 })
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
