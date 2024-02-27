export interface PaginatedLinks<T = any> {
  next: T | null;
  previous: T | null;
}

export interface AxiosPaginatedResponse<T = any> {
  links: PaginatedLinks;
  count: number;
  results: T[];
}
