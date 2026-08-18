import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "../orm/entities";

import { type ListPaginatedOptions, resolveOrder } from "./repository.helpers";

const USER_SEARCH_COLUMNS = ["email", "username"] as const;

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  findByEmailOrUsername(value: string): Promise<UserEntity | null> {
    return this.repo
      .createQueryBuilder("user")
      .where("user.email = :value OR user.username = :value", { value })
      .getOne();
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findAllPaginated(
    options: ListPaginatedOptions,
  ): Promise<[UserEntity[], number]> {
    const { column, direction } = resolveOrder(
      options.orderBy,
      options.orderType,
      USER_SEARCH_COLUMNS,
    );

    const qb = this.repo.createQueryBuilder("user");

    if (options.search) {
      qb.where(
        "user.email ILIKE :search OR user.username ILIKE :search",
        { search: `%${options.search}%` },
      );
    }

    qb.orderBy(`user.${column}`, direction)
      .skip((options.page - 1) * options.limit)
      .take(options.limit);

    return qb.getManyAndCount();
  }

  create(data: Partial<UserEntity>): UserEntity {
    return this.repo.create(data);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }
}
