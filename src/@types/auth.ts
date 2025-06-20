import type { User } from "./user";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  accessToken: string;
}