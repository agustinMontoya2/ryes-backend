import { combineDocs } from "@common/docs/combine-docs";

import { patientsErrors } from "./patients.errors";
import { patientsSuccess } from "./patients.success";

import type { PatientsController } from "../../patients.controller";

export const patientsApiDocs = combineDocs<PatientsController>(
  patientsSuccess,
  patientsErrors,
);
