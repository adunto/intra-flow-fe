import { User } from "@/types/user";
import { apiProxy } from "./proxy";

export const getUserInfo = async (): Promise<User> => {
  try {
    const response = await apiProxy<User>({
      url: "/users/profile",
      method: "GET",
      withCredentials: true,
      timeout: 1000,
    });

    return response;
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    throw error;
  }
};
