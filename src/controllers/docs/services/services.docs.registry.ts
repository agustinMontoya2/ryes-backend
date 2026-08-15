import { combineDocs } from "@common/docs/combine-docs";

import { servicesErrors } from "./services.errors";
import { servicesSuccess } from "./services.success";

import type { ServicesController } from "../../services.controller";

export const servicesApiDocs = combineDocs<ServicesController>(
  servicesSuccess,
  servicesErrors,
);
