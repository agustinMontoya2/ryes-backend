import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";

import { ApiDocumentation, BranchId } from "@common/decorators";
import { uuidParam } from "@common/helpers";

import { ordersApiDocs } from "./docs";
import { UuidParamDto } from "./dtos/common";
import {
  CreateOrderDto,
  ListOrdersQueryDto,
  UpdateOrderDto,
} from "./dtos/orders";
import { placeholderId, placeholderOrder } from "./placeholders";

@Controller("orders")
@ApiDocumentation(ordersApiDocs)
export class OrdersController {
  @Get()
  list(@Query() _query: ListOrdersQueryDto, @BranchId() _branchId: string) {
    return [];
  }

  @Post()
  create(@Body() _body: CreateOrderDto, @BranchId() _branchId: string) {
    return { id: placeholderId() };
  }

  @Get(":id")
  @ApiParam(uuidParam("Orden"))
  get(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return placeholderOrder({ id: params.id });
  }

  @Put(":id")
  @ApiParam(uuidParam("Orden"))
  update(
    @Param() params: UuidParamDto,
    @Body() _body: UpdateOrderDto,
    @BranchId() _branchId: string,
  ) {
    return { id: params.id };
  }

  @Delete(":id")
  @ApiParam(uuidParam("Orden"))
  remove(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return { id: params.id };
  }

  @Post(":id/complete")
  @ApiParam(uuidParam("Orden"))
  complete(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return { id: params.id };
  }
}
