import { Injectable } from "@nestjs/common";

import { BranchRepository, UserBranchRepository } from "../infrastructure/repositories";

import type { BranchEntity } from "../infrastructure/orm/entities";

@Injectable()
export class BranchesService {
  constructor(
    private readonly branchRepository: BranchRepository,
    private readonly userBranchRepository: UserBranchRepository,
  ) {}

  async list(userId: string, isSuperAdmin: boolean): Promise<BranchEntity[]> {
    if (isSuperAdmin) {
      return this.branchRepository.listAll();
    }

    const branchIds =
      await this.userBranchRepository.findBranchIdsByUserId(userId);

    if (branchIds.length === 0) return [];

    return this.branchRepository.findByIds(branchIds);
  }
}
