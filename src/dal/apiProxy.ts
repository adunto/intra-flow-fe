import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { refreshAccessToken } from "@/dal/auth";
import { useAuthStore } from "@/stores/useAuthStore";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 자동 쿠키 삽입
});

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (!config.headers) {
    config.headers = {} as any;
  }

  if (token) {
    // Request 에 토큰 넣기 ( 있는 경우에만 )
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RequestConfig;

    // 요청 정보가 없거나, 이미 재시도한 경우 패스
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 401 에러 -> 토큰 재발급 요청
    // 무한 루프 방지
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        useAuthStore.getState().setIsPending(true);

        const { accessToken } = await refreshAccessToken();

        useAuthStore.getState().setAccessToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setAccessToken(null);

        return Promise.reject(refreshError);
      } finally {
        useAuthStore.getState().setIsPending(false);
      }
    }
    return Promise.reject(error);
  },
);

export const apiProxy = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await client.request<T>(config);

  return response.data;
};
