import { Controller, Get } from "@nestjs/common";

import { ApiDocumentation } from "@common/decorators";

import { BranchesService } from "../services";

import { branchesApiDocs } from "./docs";

@Controller("branches")
@ApiDocumentation(branchesApiDocs)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  list() {
    return this.branchesService.list();
  }
}
