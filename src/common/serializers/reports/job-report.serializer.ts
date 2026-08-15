import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { OrderSerializer } from "../orders/order.serializer";

export class JobReportSerializer {
  @ApiProperty({ format: "uuid" })
  @Expose()
  id: string;

  @ApiProperty({ format: "uuid" })
  @Expose()
  branchId: string;

  @ApiProperty()
  @Expose()
  deliveryDate: Date;

  @ApiProperty({ example: 105000, minimum: 0 })
  @Expose()
  totalPrice: number;

  @ApiProperty({ type: () => [OrderSerializer] })
  @Expose()
  @Type(() => OrderSerializer)
  orders: OrderSerializer[];

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
