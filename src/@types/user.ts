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