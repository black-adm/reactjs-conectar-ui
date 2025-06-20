import type { SignInRequest, SignInResponse } from "../@types/auth";
import { storageKeys } from "../config/storageKeys";
import { httpClient } from "../lib/axios";

export class AuthService {
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
}