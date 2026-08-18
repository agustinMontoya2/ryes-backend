import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BranchEntity } from "../orm/entities";

@Injectable()
export class BranchRepository {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  listAll(): Promise<BranchEntity[]> {
    return this.branchRepository.find({ order: { location: "ASC" } });
  }

  findByIds(ids: string[]): Promise<BranchEntity[]> {
    if (ids.length === 0) return Promise.resolve([]);
    return this.branchRepository
      .createQueryBuilder("b")
      .where("b.id IN (:...ids)", { ids })
      .orderBy("b.location", "ASC")
      .getMany();
  }

  existsById(id: string): Promise<boolean> {
    return this.branchRepository.exists({ where: { id } });
  }
}
