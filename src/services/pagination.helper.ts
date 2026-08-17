export interface PaginationData {
  totalItems: number;
  limit: number;
  currentPage: number;
  pages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationData;
}

export function buildPagination(
  total: number,
  page: number,
  limit: number,
): PaginationData {
  return {
    totalItems: total,
    limit,
    currentPage: page,
    pages: Math.max(1, Math.ceil(total / limit)),
  };
}
