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

import { ServicesService } from "../services";

import { servicesApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import { CreateServiceDto, UpdateServiceDto } from "./dtos/services";

@Controller("services")
@ApiDocumentation(servicesApiDocs)
@UseGuards(BranchExistsGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  list(@Query() query: PaginationDto, @BranchId() branchId: string) {
    return this.servicesService.list(branchId, query);
  }

  @Post()
  create(@Body() body: CreateServiceDto, @BranchId() branchId: string) {
    return this.servicesService.create(branchId, body);
  }

  @Get("by-name/:name")
  @ApiParam({ name: "name", description: "Nombre del servicio" })
  getByName(
    @Param("name") name: string,
    @BranchId() branchId: string,
  ) {
    return this.servicesService.getByName(branchId, name);
  }

  @Get(":id")
  @ApiParam(uuidParam("Servicio"))
  get(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.servicesService.get(branchId, params.id);
  }

  @Put(":id")
  @ApiParam(uuidParam("Servicio"))
  update(
    @Param() params: UuidParamDto,
    @Body() body: UpdateServiceDto,
    @BranchId() branchId: string,
  ) {
    return this.servicesService.update(branchId, params.id, body);
  }

  @Delete(":id")
  @ApiParam(uuidParam("Servicio"))
  remove(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.servicesService.remove(branchId, params.id);
  }
}
