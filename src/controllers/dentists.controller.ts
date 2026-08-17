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

import { DentistsService } from "../services";

import { dentistsApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import { CreateDentistDto, UpdateDentistDto } from "./dtos/dentists";

@Controller("dentists")
@ApiDocumentation(dentistsApiDocs)
@UseGuards(BranchExistsGuard)
export class DentistsController {
  constructor(private readonly dentistsService: DentistsService) {}

  @Get()
  list(@Query() query: PaginationDto, @BranchId() branchId: string) {
    return this.dentistsService.list(branchId, query);
  }

  @Post()
  create(@Body() body: CreateDentistDto, @BranchId() branchId: string) {
    return this.dentistsService.create(branchId, body);
  }

  @Get(":id")
  @ApiParam(uuidParam("Odontólogo"))
  get(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.dentistsService.get(branchId, params.id);
  }

  @Put(":id")
  @ApiParam(uuidParam("Odontólogo"))
  update(
    @Param() params: UuidParamDto,
    @Body() body: UpdateDentistDto,
    @BranchId() branchId: string,
  ) {
    return this.dentistsService.update(branchId, params.id, body);
  }

  @Delete(":id")
  @ApiParam(uuidParam("Odontólogo"))
  remove(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.dentistsService.remove(branchId, params.id);
  }
}
