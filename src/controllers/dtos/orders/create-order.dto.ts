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

import { OrderDentistDto } from "./order-dentist.dto";
import { OrderPatientDto } from "./order-patient.dto";

export class CreateOrderDto {
  @ApiProperty({ type: () => OrderPatientDto })
  @ValidateNested()
  @Type(() => OrderPatientDto)
  patient: OrderPatientDto;

  @ApiProperty({ type: () => OrderDentistDto })
  @ValidateNested()
  @Type(() => OrderDentistDto)
  dentist: OrderDentistDto;

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

  @ApiProperty({
    required: false,
    nullable: true,
    example: "Lab Central",
    type: "string",
  })
  @IsOptional()
  @IsString()
  lab?: string | null;
}
