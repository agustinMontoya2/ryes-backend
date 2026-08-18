import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "../orm/entities";

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
    page: number,
    limit: number,
    search?: string,
    includeAdmins?: boolean,
  ): Promise<[UserEntity[], number]> {
    const qb = this.repo.createQueryBuilder("user");

    if (search) {
      qb.where(
        "user.email ILIKE :search OR user.username ILIKE :search",
        { search: `%${search}%` },
      );
    }

    if (!includeAdmins) {
      const method = search ? "andWhere" : "where";
      qb[method]("user.is_super_admin = false");
    }

    qb.orderBy("user.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    return qb.getManyAndCount();
  }

  create(data: Partial<UserEntity>): UserEntity {
    return this.repo.create(data);
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }
}
