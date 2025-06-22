import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse
} from "../@types/auth";

import { storageKeys } from "../config/storageKeys";
import { authClient } from "../lib/axios";

export class AuthService {
  static async signUp({ name, email, password }: SignUpRequest) {
    try {
      const { data } = await authClient.post<SignUpResponse>(
        `/auth/register`,
        {
          name,
          email,
          password,
        },
      );

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }

  static async signIn({ email, password }: SignInRequest) {
    try {
      const { data } = await authClient.post<SignInResponse>(
        `/auth/login`,
        {
          email,
          password,
        },
      );

      localStorage.setItem(storageKeys.accessToken, data.accessToken);

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }
}