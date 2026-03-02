import type { User } from "@/types/user";
import { apiProxy } from "./proxy";

export const getUserInfo = async (): Promise<User> => {
  const response = await apiProxy<User>({
    url: "/users/profile",
    method: "GET",
    withCredentials: true,
    timeout: 1000,
  });

  return response;
};
