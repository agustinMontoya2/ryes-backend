import { combineDocs } from "@common/docs/combine-docs";

import { reportsErrors } from "./reports.errors";
import { reportsSuccess } from "./reports.success";

import type { ReportsController } from "../../reports.controller";

export const reportsApiDocs = combineDocs<ReportsController>(
  reportsSuccess,
  reportsErrors,
);
