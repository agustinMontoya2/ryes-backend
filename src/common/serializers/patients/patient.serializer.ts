import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PatientSerializer {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  branchId: string;

  @ApiProperty({ example: "María González" })
  @Expose()
  fullname: string;

  @ApiProperty({ example: 35123456 })
  @Expose()
  dni: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
