export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string | Record<string, any>;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}
