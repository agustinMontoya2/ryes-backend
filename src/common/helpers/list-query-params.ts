import type { ApiQueryOptions } from "@nestjs/swagger";

export function listQueryParams(options: {
  searchDescription: string;
  orderByExample: string;
  categoryFilter?: boolean;
}): ApiQueryOptions[] {
  const params: ApiQueryOptions[] = [
    {
      name: "page",
      required: false,
      type: Number,
      minimum: 1,
      example: 1,
      description: "Page number",
    },
    {
      name: "limit",
      required: false,
      type: Number,
      minimum: 1,
      maximum: 100,
      example: 10,
      description: "Items per page",
    },
    {
      name: "orderBy",
      required: false,
      description: "Field to sort by",
      example: options.orderByExample,
    },
    {
      name: "orderType",
      required: false,
      enum: ["asc", "desc", "ASC", "DESC"],
      description: "Sort direction",
    },
    { name: "search", required: false, description: options.searchDescription },
  ];

  if (options.categoryFilter) {
    params.push({
      name: "categorySlug",
      required: false,
      description: "Filter by category slug",
      example: "ropa",
    });
  }

  return params;
}
