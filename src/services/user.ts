import type { GetUsersResponse, UpdateUserRequest, User } from "../@types/user";
import { dataClient } from "../lib/axios";

export class UserService {
  static async getProfileData() {
    try {
      const { data } = await dataClient.get<User>(
        `/users/me`,
      );

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }

  static async getUsers(filters: {
    page: number;
    limit: number;
    role?: string;
    sortBy?: string;
    order?: string;
  }): Promise<GetUsersResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    const { data } = await dataClient.get<GetUsersResponse>(
      `/users?${queryParams.toString()}`
    );

    return data;
  }

  static async updateUserData(userId: string, userData: UpdateUserRequest) {
    try {
      const { data } = await dataClient.patch<User>(
        `/users/${userId}`,
        userData,
      );

      return data;
    } catch {
      throw new Error("Internal server error!");
    }
  }
}