import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import { PaginationDto } from "../common/pagination-dto";

export class ListOrdersQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: OrderStatusEnum,
    description: "Filtra por estado",
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;
}
