import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";

import { UserBranchEntity } from "../orm/entities";

@Injectable()
export class UserBranchRepository {
  constructor(
    @InjectRepository(UserBranchEntity)
    private readonly repo: Repository<UserBranchEntity>,
  ) {}

  async assign(userId: string, branchIds: string[]): Promise<void> {
    const values = branchIds.map((branchId) => ({ userId, branchId }));
    try {
      await this.repo
        .createQueryBuilder()
        .insert()
        .into(UserBranchEntity)
        .values(values)
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError && isUniqueViolation(error)) {
        return;
      }
      throw error;
    }
  }

  async unassign(userId: string, branchId: string): Promise<void> {
    await this.repo.delete({ userId, branchId });
  }

  findByUserId(userId: string): Promise<UserBranchEntity[]> {
    return this.repo.find({ where: { userId } });
  }
}

function isUniqueViolation(error: QueryFailedError): boolean {
  const driverError = error.driverError as { code?: string };
  return driverError?.code === "23505";
}
