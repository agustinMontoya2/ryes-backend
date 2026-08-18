import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

import { ApiDocumentation, CurrentUser } from "@common/decorators";
import { SuperAdminGuard } from "@common/guards/super-admin.guard";

import { JwtAuthGuard } from "../modules/auth";
import { UsersService } from "../services/users.service";

import { usersApiDocs } from "./docs";
import { UsersPaginationDto, UuidParamDto } from "./dtos/common";
import { AssignBranchesDto } from "./dtos/users";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@ApiDocumentation(usersApiDocs)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(SuperAdminGuard)
  list(@Query() query: UsersPaginationDto) {
    return this.usersService.list(query);
  }

  @Get("me")
  getMe(@CurrentUser() user: { id: string }) {
    return this.usersService.getMe(user.id);
  }

  @Post(":id/branches")
  @UseGuards(SuperAdminGuard)
  @ApiParam({ name: "id", description: "User ID" })
  assignBranches(
    @Param() params: UuidParamDto,
    @Body() body: AssignBranchesDto,
  ) {
    return this.usersService.assignBranches(params.id, body.branchIds);
  }
}
