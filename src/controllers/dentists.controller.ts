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

import { dentistsApiDocs } from "./docs";
import { PaginationDto, UuidParamDto } from "./dtos/common";
import { CreateDentistDto, UpdateDentistDto } from "./dtos/dentists";
import { placeholderDentist, placeholderId } from "./placeholders";

@Controller("dentists")
@ApiDocumentation(dentistsApiDocs)
export class DentistsController {
  @Get()
  list(@Query() _query: PaginationDto, @BranchId() _branchId: string) {
    return [];
  }

  @Post()
  create(@Body() _body: CreateDentistDto, @BranchId() _branchId: string) {
    return { id: placeholderId() };
  }

  @Get(":id")
  @ApiParam(uuidParam("Odontólogo"))
  get(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return placeholderDentist({ id: params.id });
  }

  @Put(":id")
  @ApiParam(uuidParam("Odontólogo"))
  update(
    @Param() params: UuidParamDto,
    @Body() _body: UpdateDentistDto,
    @BranchId() _branchId: string,
  ) {
    return { id: params.id };
  }

  @Delete(":id")
  @ApiParam(uuidParam("Odontólogo"))
  remove(@Param() params: UuidParamDto, @BranchId() _branchId: string) {
    return { id: params.id };
  }
}
