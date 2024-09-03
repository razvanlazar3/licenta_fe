export const BASE_APP_URL = "http://localhost:8083/api";
export const BANKS_URL = "http://localhost:8083/api/banks";
export const CRYPTO_URL = "http://localhost:8083/api/cryptocurrency";

export interface Page<T> {
  content: T[];
  page: PageInfo<T>;
}

export interface PageInfo<T> {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

