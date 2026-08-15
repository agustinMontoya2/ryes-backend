import { combineDocs } from "@common/docs/combine-docs";

import { dentistsErrors } from "./dentists.errors";
import { dentistsSuccess } from "./dentists.success";

import type { DentistsController } from "../../dentists.controller";

export const dentistsApiDocs = combineDocs<DentistsController>(
  dentistsSuccess,
  dentistsErrors,
);
