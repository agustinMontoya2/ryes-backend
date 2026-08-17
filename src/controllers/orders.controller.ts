import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";

import { ApiDocumentation, BranchId } from "@common/decorators";
import { BranchExistsGuard } from "@common/guards";
import { uuidParam } from "@common/helpers";

import { OrdersService } from "../services";

import { ordersApiDocs } from "./docs";
import { UuidParamDto } from "./dtos/common";
import {
  CreateOrderDto,
  ListOrdersQueryDto,
  UpdateOrderDto,
} from "./dtos/orders";

@Controller("orders")
@ApiDocumentation(ordersApiDocs)
@UseGuards(BranchExistsGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  list(@Query() query: ListOrdersQueryDto, @BranchId() branchId: string) {
    return this.ordersService.list(branchId, query);
  }

  @Post()
  create(@Body() body: CreateOrderDto, @BranchId() branchId: string) {
    return this.ordersService.create(branchId, body);
  }

  @Get(":id")
  @ApiParam(uuidParam("Orden"))
  get(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.ordersService.get(branchId, params.id);
  }

  @Put(":id")
  @ApiParam(uuidParam("Orden"))
  update(
    @Param() params: UuidParamDto,
    @Body() body: UpdateOrderDto,
    @BranchId() branchId: string,
  ) {
    return this.ordersService.update(branchId, params.id, body);
  }

  @Delete(":id")
  @ApiParam(uuidParam("Orden"))
  remove(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.ordersService.remove(branchId, params.id);
  }

  @Post(":id/complete")
  @ApiParam(uuidParam("Orden"))
  complete(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.ordersService.complete(branchId, params.id);
  }
}
