export interface DefaultPaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginatedLinks<T = any> {
  next: T | null;
  previous: T | null;
}

export interface AxiosPaginatedResponse<T = any> {
  links: PaginatedLinks;
  next: T | null;
  previous: T | null;
  count: number;
  results: T[];
}
