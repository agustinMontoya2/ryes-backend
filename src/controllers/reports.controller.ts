import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";

import { ApiDocumentation, BranchId } from "@common/decorators";
import { uuidParam } from "@common/helpers";

import { reportsApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import { CreateReportDto } from "./dtos/reports";
import { placeholderId, placeholderJobReport } from "./placeholders";

@Controller("reports")
@ApiDocumentation(reportsApiDocs)
export class ReportsController {
  @Get()
  list(@Query() _query: PaginationDto, @BranchId() _branchId: string) {
    return [];
  }

  @Post()
  create(@Body() _body: CreateReportDto, @BranchId() _branchId: string) {
    return { id: placeholderId() };
  }

  @Get(":id")
  @ApiParam(uuidParam("Remito"))
  get(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return placeholderJobReport({ id: params.id });
  }

  @Delete(":id")
  @ApiParam(uuidParam("Remito"))
  remove(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return { id: params.id };
  }
}
