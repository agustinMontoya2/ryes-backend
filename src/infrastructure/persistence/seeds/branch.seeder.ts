import { Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { BranchEntity } from "../../orm/entities";

import { BRANCH_SEED } from "./data/branch.data";
import { formatSeederLog } from "./helpers";

export default class BranchSeeder implements Seeder {
  private readonly logger = new Logger(BranchSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    const sn = BranchSeeder.name;
    this.logger.log(formatSeederLog(sn, "start", "begin"));
    const repo = dataSource.getRepository(BranchEntity);

    const existingByLocation = new Map(
      (await repo.find()).map((e) => [e.location.toLowerCase(), e]),
    );

    for (const seed of BRANCH_SEED) {
      const key = seed.location!.toLowerCase();
      const current = existingByLocation.get(key);

      if (!current) {
        const entity = repo.create(seed);
        const result = await repo.insert(entity);
        entity.id = result.identifiers[0].id;
        this.logger.log(
          formatSeederLog(
            sn,
            "created",
            `location=${seed.location} id=${entity.id}`,
          ),
        );
        continue;
      }

      this.logger.debug(
        formatSeederLog(sn, "skip", `location=${seed.location} unchanged`),
      );
    }

    this.logger.log(formatSeederLog(sn, "complete", "finished"));
  }
}
