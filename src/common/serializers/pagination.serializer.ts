import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PaginationSerializer {
  @ApiProperty({ example: 90 })
  @Expose()
  totalItems: number;

  @ApiProperty({ example: 10 })
  @Expose()
  limit: number;

  @ApiProperty({ example: 1 })
  @Expose()
  currentPage: number;

  @ApiProperty({ example: 9 })
  @Expose()
  pages: number;
}
