import { Logger } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { AuthConfig } from "../../../config/stack";
import { UserEntity } from "../../orm/entities";

import { formatSeederLog } from "./helpers";

export default class UserSeeder implements Seeder {
  private readonly logger = new Logger(UserSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    const sn = UserSeeder.name;
    this.logger.log(formatSeederLog(sn, "start", "begin"));

    const authConfig = AuthConfig();
    const repo = dataSource.getRepository(UserEntity);

    const existing = await repo.findOne({
      where: { email: authConfig.ADMIN_EMAIL },
    });

    if (existing) {
      this.logger.debug(
        formatSeederLog(
          sn,
          "skip",
          `admin user ${authConfig.ADMIN_EMAIL} already exists`,
        ),
      );
      return;
    }

    const hashedPassword = await bcrypt.hash(
      authConfig.ADMIN_PASSWORD,
      authConfig.BCRYPT_SALT_ROUNDS,
    );

    const admin = repo.create({
      email: authConfig.ADMIN_EMAIL,
      username: authConfig.ADMIN_USERNAME,
      password: hashedPassword,
      isSuperAdmin: true,
    });

    await repo.save(admin);

    this.logger.log(
      formatSeederLog(
        sn,
        "created",
        `email=${authConfig.ADMIN_EMAIL} username=${authConfig.ADMIN_USERNAME}`,
      ),
    );
    this.logger.log(formatSeederLog(sn, "complete", "finished"));
  }
}
