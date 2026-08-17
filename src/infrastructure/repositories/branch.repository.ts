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

  existsById(id: string): Promise<boolean> {
    return this.branchRepository.exists({ where: { id } });
  }
}
