import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsDateString, IsUUID } from "class-validator";

export class CreateReportDto {
  @ApiProperty({ type: [String], minItems: 1 })
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  orderIds: string[];

  @ApiProperty({ example: "2026-08-14" })
  @IsDateString()
  deliveryDate: string;
}
