export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  googleId?: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserFilters {
  role?: 'admin' | 'user';
  sortBy?: 'createdAt' | 'name';
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface GetUsersResponse {
  data: User[];
  pagination: Pagination;
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}