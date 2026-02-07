import { User } from "@/types/user";
import { apiProxy } from "./proxy";
import { useAuthStore } from "@/stores/useAuthStore";

// 회원가입
export const signup = async (
  formData: Pick<User, "username" | "email" | "password">,
) => {
  await apiProxy<void>({
    url: "/auth/signup",
    method: "POST",
    data: formData,
  });
};

// 로그인
export const login = async (credentials: Pick<User, "email" | "password">) => {
  const response = await apiProxy<{ accessToken: string }>({
    url: "/auth/login",
    method: "POST",
    data: credentials,
  });

  const { accessToken } = response;
  useAuthStore.getState().setAccessToken(accessToken);

  return response;
};

// 토큰 재발급
export const refreshAccessToken = async () => {
  const response = await apiProxy<{ accessToken: string }>({
    url: "/auth/refresh",
    method: "POST",
    withCredentials: true,
  });

  const { accessToken } = response;
  useAuthStore.getState().setAccessToken(accessToken);

  return response;
};
