export interface PaginatedResponse<T> {
  items: T[];
  previousId?: number;
  nextId?: number;
}
