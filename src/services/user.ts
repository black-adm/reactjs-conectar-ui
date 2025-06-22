import type { UpdateUserRequest, User } from "../@types/user";
import { httpClient } from "../lib/axios";

export class UserService {
  static async getProfileData() {
    try {
      const { data } = await httpClient.get<User>(
        `/users/me`,
      );

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }

  static async updateUserData(userId: string, userData: UpdateUserRequest) {
    try {
      const { data } = await httpClient.patch<User>(
        `/users/${userId}`,
        userData,
      );

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }
}