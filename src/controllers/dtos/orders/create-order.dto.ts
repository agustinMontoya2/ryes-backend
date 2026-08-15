import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ format: "uuid" })
  @IsUUID()
  patientId: string;

  @ApiProperty({ format: "uuid" })
  @IsUUID()
  dentistId: string;

  @ApiProperty({ type: [String], minItems: 1 })
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  serviceIds: string[];

  @ApiProperty({ example: "2026-08-14" })
  @IsDateString()
  dispatchDate: string;

  @ApiProperty({ example: "2026-08-21", description: "Debe ser >= dispatchDate" })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ required: false, nullable: true, example: "Lab Central" })
  @IsOptional()
  @IsString()
  lab?: string | null;
}
