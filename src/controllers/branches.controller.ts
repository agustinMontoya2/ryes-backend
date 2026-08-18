import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ApiDocumentation, CurrentUser } from "@common/decorators";

import { JwtAuthGuard } from "../modules/auth";
import { BranchesService } from "../services";

import { branchesApiDocs } from "./docs";

@ApiTags("Branches")
@UseGuards(JwtAuthGuard)
@Controller("branches")
@ApiDocumentation(branchesApiDocs)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  list(@CurrentUser() user: { id: string; isSuperAdmin: boolean }) {
    return this.branchesService.list(user.id, user.isSuperAdmin);
  }
}
