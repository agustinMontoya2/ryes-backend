import { combineDocs } from "@common/docs/combine-docs";

import { branchesErrors } from "./branches.errors";
import { branchesSuccess } from "./branches.success";

import type { BranchesController } from "../../branches.controller";

export const branchesApiDocs = combineDocs<BranchesController>(
  branchesSuccess,
  branchesErrors,
);
