import { Injectable } from "@nestjs/common";

import { AppError, ResponseExceptionsEnum } from "@common/exceptions";

import {
  BranchRepository,
  UserRepository,
  UserBranchRepository,
} from "../infrastructure/repositories";

import { buildPagination } from "./pagination.helper";

import type { UsersPaginationDto } from "../controllers/dtos/common";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userBranchRepository: UserBranchRepository,
    private readonly branchRepository: BranchRepository,
  ) {}

  async list(query: UsersPaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const [users, total] = await this.userRepository.findAllPaginated(
      page,
      limit,
      query.search,
      query.includeAdmins,
    );

    const userIds = users.map((u) => u.id);
    const branchesMap =
      await this.userBranchRepository.findBranchIdsByUserIds(userIds);

    const data = await Promise.all(
      users.map(async (user) => {
        const branchIds = branchesMap.get(user.id) ?? [];
        const branches =
          branchIds.length > 0
            ? await this.branchRepository.findByIds(branchIds)
            : [];
        return { ...user, branches };
      }),
    );

    return {
      data,
      pagination: buildPagination(total, page, limit),
    };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "userId",
      });
    }

    return user;
  }

  async assignBranches(userId: string, branchIds: string[]) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "userId",
      });
    }

    if (user.isSuperAdmin) {
      throw new AppError(
        ResponseExceptionsEnum.CANNOT_ASSIGN_BRANCHES_TO_SUPER_ADMIN,
      );
    }

    const existingBranches = await this.branchRepository.findByIds(branchIds);
    if (existingBranches.length !== branchIds.length) {
      throw new AppError(ResponseExceptionsEnum.RESOURCE_NOT_FOUND, {
        property: "branchId",
      });
    }

    await this.userBranchRepository.sync(userId, branchIds);

    return { id: userId };
  }
}
