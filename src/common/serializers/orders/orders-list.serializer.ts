import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { PaginationSerializer } from "../pagination.serializer";

import { OrderSerializer } from "./order.serializer";

export class OrdersListSerializer {
  @ApiProperty({ type: () => [OrderSerializer] })
  @Expose()
  @Type(() => OrderSerializer)
  data: OrderSerializer[];

  @ApiProperty({ type: () => PaginationSerializer })
  @Expose()
  @Type(() => PaginationSerializer)
  pagination: PaginationSerializer;
}
