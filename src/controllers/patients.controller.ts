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

import { patientsApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import {
  CreatePatientDto,
  LookupPatientQueryDto,
  UpdatePatientDto,
} from "./dtos/patients";
import { placeholderId, placeholderPatient } from "./placeholders";

@Controller("patients")
@ApiDocumentation(patientsApiDocs)
export class PatientsController {
  @Get()
  list(@Query() _query: PaginationDto, @BranchId() _branchId: string) {
    return [];
  }

  @Get("lookup")
  lookup(
    @Query() _query: LookupPatientQueryDto,
    @BranchId() _branchId: string,
  ) {
    return placeholderPatient();
  }

  @Post()
  create(@Body() _body: CreatePatientDto, @BranchId() _branchId: string) {
    return { id: placeholderId() };
  }

  @Get(":id")
  @ApiParam(uuidParam("Paciente"))
  get(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return placeholderPatient({ id: params.id });
  }

  @Put(":id")
  @ApiParam(uuidParam("Paciente"))
  update(
    @Param() params: UuidParamDto,
    @Body() _body: UpdatePatientDto,
    @BranchId() _branchId: string,
  ) {
    return { id: params.id };
  }

  @Delete(":id")
  @ApiParam(uuidParam("Paciente"))
  remove(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return { id: params.id };
  }
}
