import { useAuthStore } from "@/stores/useAuthStore";
import type { User, UserSummary } from "@/types/user";
import { apiProxy } from "./apiProxy";

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
  const response = await apiProxy<{ user: UserSummary; accessToken: string }>({
    url: "/auth/login",
    method: "POST",
    data: credentials,
  });

  const { user, accessToken } = response;
  useAuthStore.getState().setAccessToken(accessToken);
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setIsAuthInitialized(true);

  return response;
};

// 토큰 재발급
export const refreshAccessToken = async () => {
  const response = await apiProxy<{
    success: boolean;
    user: UserSummary;
    accessToken: string;
  }>({
    url: "/auth/refresh",
    method: "POST",
    withCredentials: true,
  });

  if (!response.success) {
    useAuthStore.getState().setAccessToken(null);
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setIsAuthInitialized(true);
    return response;
  }

  const { user, accessToken } = response;
  useAuthStore.getState().setAccessToken(accessToken);
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setIsAuthInitialized(true);

  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await apiProxy<{ success: boolean; message: string }>({
    url: "/auth/logout",
    method: "POST",
    withCredentials: true,
  });

  useAuthStore.getState().setAccessToken(null);
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setIsAuthInitialized(true);

  return response;
};
