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

  async sync(userId: string, branchIds: string[]): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .delete()
      .from(UserBranchEntity)
      .where("user_id = :userId", { userId })
      .execute();

    if (branchIds.length > 0) {
      const values = branchIds.map((branchId) => ({ userId, branchId }));
      await this.repo
        .createQueryBuilder()
        .insert()
        .into(UserBranchEntity)
        .values(values)
        .onConflict('("user_id", "branch_id") DO NOTHING')
        .execute();
    }
  }

  findBranchIdsByUserId(userId: string): Promise<string[]> {
    return this.repo
      .createQueryBuilder("ub")
      .select("ub.branch_id")
      .where("ub.user_id = :userId", { userId })
      .getRawMany()
      .then((rows) => rows.map((r) => r.branch_id));
  }

  async findBranchIdsByUserIds(
    userIds: string[],
  ): Promise<Map<string, string[]>> {
    if (userIds.length === 0) return new Map();

    const rows = await this.repo
      .createQueryBuilder("ub")
      .select("ub.user_id", "userId")
      .addSelect("ub.branch_id", "branchId")
      .where("ub.user_id IN (:...userIds)", { userIds })
      .getRawMany();

    const map = new Map<string, string[]>();
    for (const row of rows) {
      const existing = map.get(row.userId) ?? [];
      existing.push(row.branchId);
      map.set(row.userId, existing);
    }
    return map;
  }
}
