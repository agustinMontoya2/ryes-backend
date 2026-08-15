import { Controller, Get } from "@nestjs/common";

import { ApiDocumentation } from "@common/decorators";

import { branchesApiDocs } from "./docs";

@Controller("branches")
@ApiDocumentation(branchesApiDocs)
export class BranchesController {
  @Get()
  list() {
    return [];
  }
}
