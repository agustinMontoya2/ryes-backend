import { combineDocs } from "@common/docs/combine-docs";

import { authErrors } from "./auth.errors";
import { authSuccess } from "./auth.success";

import type { AuthController } from "../auth.controller";

export const authApiDocs = combineDocs<AuthController>(
  authSuccess,
  authErrors,
);
