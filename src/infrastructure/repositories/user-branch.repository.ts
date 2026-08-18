import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserBranchEntity } from "../orm/entities";

@Injectable()
export class UserBranchRepository {
  constructor(
    @InjectRepository(UserBranchEntity)
    private readonly repo: Repository<UserBranchEntity>,
  ) {}

  async assign(userId: string, branchIds: string[]): Promise<void> {
    const values = branchIds.map((branchId) => ({ userId, branchId }));
    await this.repo
      .createQueryBuilder()
      .insert()
      .into(UserBranchEntity)
      .values(values)
      .onConflict('("user_id", "branch_id") DO NOTHING')
      .execute();
  }

  async unassign(userId: string, branchId: string): Promise<void> {
    await this.repo.delete({ userId, branchId });
  }

  findByUserId(userId: string): Promise<UserBranchEntity[]> {
    return this.repo.find({ where: { userId } });
  }
}
