export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  googleId?: string;
  lastLoginAt: string;
  createdAt: string;
}