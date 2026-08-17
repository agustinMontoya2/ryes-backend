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

import { PatientsService } from "../services";

import { patientsApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import {
  CreatePatientDto,
  LookupPatientQueryDto,
  UpdatePatientDto,
} from "./dtos/patients";

@Controller("patients")
@ApiDocumentation(patientsApiDocs)
@UseGuards(BranchExistsGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  list(@Query() query: PaginationDto, @BranchId() branchId: string) {
    return this.patientsService.list(branchId, query);
  }

  @Get("lookup")
  lookup(
    @Query() query: LookupPatientQueryDto,
    @BranchId() branchId: string,
  ) {
    return this.patientsService.lookup(branchId, query.dni);
  }

  @Post()
  create(@Body() body: CreatePatientDto, @BranchId() branchId: string) {
    return this.patientsService.create(branchId, body);
  }

  @Get(":id")
  @ApiParam(uuidParam("Paciente"))
  get(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.patientsService.get(branchId, params.id);
  }

  @Put(":id")
  @ApiParam(uuidParam("Paciente"))
  update(
    @Param() params: UuidParamDto,
    @Body() body: UpdatePatientDto,
    @BranchId() branchId: string,
  ) {
    return this.patientsService.update(branchId, params.id, body);
  }

  @Delete(":id")
  @ApiParam(uuidParam("Paciente"))
  remove(@Param() params: UuidParamDto, @BranchId() branchId: string) {
    return this.patientsService.remove(branchId, params.id);
  }
}
