import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse
} from "../@types/auth";
import type { User } from "../@types/user";

import { storageKeys } from "../config/storageKeys";
import { httpClient } from "../lib/axios";

export class AuthService {
  static async signUp({ name, email, password }: SignUpRequest) {
    try {
      const { data } = await httpClient.post<SignUpResponse>(
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
      const { data } = await httpClient.post<SignInResponse>(
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

  static async googleSignIn() {
    try {
      const { data } = await httpClient.get<SignInResponse>(
        `/auth/google/login`,
      );

      localStorage.setItem(storageKeys.accessToken, data.accessToken);

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }

  static async getProfileData(token: string) {
    try {
      const { data } = await httpClient.get<User>(
        `/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }
}