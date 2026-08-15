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

import { servicesApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import { CreateServiceDto, UpdateServiceDto } from "./dtos/services";
import { placeholderId, placeholderService } from "./placeholders";

@Controller("services")
@ApiDocumentation(servicesApiDocs)
export class ServicesController {
  @Get()
  list(@Query() _query: PaginationDto, @BranchId() _branchId: string) {
    return [];
  }

  @Post()
  create(@Body() _body: CreateServiceDto, @BranchId() _branchId: string) {
    return { id: placeholderId() };
  }

  @Get(":id")
  @ApiParam(uuidParam("Servicio"))
  get(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return placeholderService({ id: params.id });
  }

  @Put(":id")
  @ApiParam(uuidParam("Servicio"))
  update(
    @Param() params: UuidParamDto,
    @Body() _body: UpdateServiceDto,
    @BranchId() _branchId: string,
  ) {
    return { id: params.id };
  }

  @Delete(":id")
  @ApiParam(uuidParam("Servicio"))
  remove(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return { id: params.id };
  }
}
