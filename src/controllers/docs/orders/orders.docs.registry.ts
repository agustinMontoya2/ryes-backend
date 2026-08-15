import { combineDocs } from "@common/docs/combine-docs";

import { ordersErrors } from "./orders.errors";
import { ordersSuccess } from "./orders.success";

import type { OrdersController } from "../../orders.controller";

export const ordersApiDocs = combineDocs<OrdersController>(
  ordersSuccess,
  ordersErrors,
);
