import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";

import { ApiDocumentation, BranchId } from "@common/decorators";
import { BranchExistsGuard } from "@common/guards";
import { uuidParam } from "@common/helpers";

import { ReportsService } from "../services";

import { reportsApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import { CreateReportDto } from "./dtos/reports";

@Controller("reports")
@ApiDocumentation(reportsApiDocs)
@UseGuards(BranchExistsGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  list(@Query() query: PaginationDto, @BranchId() branchId: string) {
    return this.reportsService.list(branchId, query);
  }

  @Post()
  create(@Body() body: CreateReportDto, @BranchId() branchId: string) {
    return this.reportsService.create(branchId, body);
  }

  @Get(":id")
  @ApiParam(uuidParam("Remito"))
  get(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.reportsService.get(branchId, params.id);
  }

  @Delete(":id")
  @ApiParam(uuidParam("Remito"))
  remove(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.reportsService.remove(branchId, params.id);
  }
}
