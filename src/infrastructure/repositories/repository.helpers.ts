export interface ListPaginatedOptions {
  search?: string;
  page: number;
  limit: number;
  orderBy?: string;
  orderType?: string;
}

export function resolveOrder(
  orderBy: string | undefined,
  orderType: string | undefined,
  whitelist: readonly string[],
  defaultColumn = "updatedAt",
): { column: string; direction: "ASC" | "DESC" } {
  const column =
    orderBy !== undefined && whitelist.includes(orderBy)
      ? orderBy
      : defaultColumn;
  const direction = orderType?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  return { column, direction };
}
