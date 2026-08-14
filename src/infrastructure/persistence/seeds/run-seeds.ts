import { runSeeders } from "typeorm-extension";

import { appDataSource } from "../data-source";

import BranchSeeder from "./branch.seeder";

async function runSeeds(): Promise<void> {
  try {
    await appDataSource.initialize();
    console.warn("Database connection initialized");

    await runSeeders(appDataSource, {
      seeds: [BranchSeeder],
      factories: [],
    });

    console.warn("All seeds executed successfully");
  } catch (error) {
    console.error("Error running seeds:", error);
    process.exitCode = 1;
  } finally {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
      console.warn("Database connection closed");
    }
  }
}

if (require.main === module) {
  runSeeds();
}

export { runSeeds };
