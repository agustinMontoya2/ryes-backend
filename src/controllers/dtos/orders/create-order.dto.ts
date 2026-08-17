import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

import { DentistOrderDto } from "./dentist-order.dto";
import { PatientOrderDto } from "./patient-order.dto";

export class CreateOrderDto {
  @ApiProperty({ type: () => PatientOrderDto })
  @ValidateNested()
  @Type(() => PatientOrderDto)
  patient: PatientOrderDto;

  @ApiProperty({ type: () => DentistOrderDto })
  @ValidateNested()
  @Type(() => DentistOrderDto)
  dentist: DentistOrderDto;

  @ApiProperty({ type: [String], minItems: 1 })
  @IsUUID("4", { each: true })
  @ArrayMinSize(1)
  serviceIds: string[];

  @ApiProperty({ example: "2026-08-14" })
  @IsDateString()
  dispatchDate: string;

  @ApiProperty({
    example: "2026-08-21",
    description: "Debe ser >= dispatchDate",
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ required: false, nullable: true, example: "Lab Central" })
  @IsOptional()
  @IsString()
  lab?: string | null;
}
