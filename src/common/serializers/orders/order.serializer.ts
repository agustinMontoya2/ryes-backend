import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import { DentistSerializer } from "../dentists/dentist.serializer";
import { PatientSerializer } from "../patients/patient.serializer";
import { ServiceSerializer } from "../services/service.serializer";

export class OrderSerializer {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  branchId: string;

  @ApiProperty({ type: () => PatientSerializer })
  @Expose()
  @Type(() => PatientSerializer)
  patient: PatientSerializer;

  @ApiProperty({ type: () => DentistSerializer })
  @Expose()
  @Type(() => DentistSerializer)
  dentist: DentistSerializer;

  @ApiProperty({ type: () => [ServiceSerializer] })
  @Expose()
  @Type(() => ServiceSerializer)
  services: ServiceSerializer[];

  @ApiProperty()
  @Expose()
  dispatchDate: Date;

  @ApiProperty()
  @Expose()
  dueDate: Date;

  @ApiProperty({ nullable: true })
  @Expose()
  lab: string | null;

  @ApiProperty({ enum: OrderStatusEnum })
  @Expose()
  status: OrderStatusEnum;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
