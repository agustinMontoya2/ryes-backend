import { combineDocs } from "@common/docs/combine-docs";

import { usersErrors } from "./users.errors";
import { usersSuccess } from "./users.success";

import type { UsersController } from "../../users.controller";

export const usersApiDocs = combineDocs<UsersController>(
  usersSuccess,
  usersErrors,
);
