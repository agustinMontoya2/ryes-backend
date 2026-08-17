import { Injectable } from "@nestjs/common";

import { BranchRepository } from "../infrastructure/repositories";

import type { BranchEntity } from "../infrastructure/orm/entities";

@Injectable()
export class BranchesService {
  constructor(private readonly branchRepository: BranchRepository) {}

  list(): Promise<BranchEntity[]> {
    return this.branchRepository.listAll();
  }
}
