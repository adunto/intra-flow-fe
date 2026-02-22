import { refreshAccessToken } from "@/dal/auth";
import { useAuthStore } from "@/stores/useAuthStore";

import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

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

    // 1. 요청 정보가 없거나, 이미 재시도한 경우 패스
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 2. [핵심] 401 에러가 난 요청이 '토큰 재발급 요청' 그 자체라면?
    // 여기서 재시도를 하면 무한 루프에 빠지므로 즉시 실패 처리합니다.
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
        const { accessToken } = await refreshAccessToken();

        useAuthStore.getState().setAccessToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setAccessToken(null);
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const apiProxy = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await client.request<T>(config);

    return response.data;
  } catch (error: any) {
    // console.error("API Proxy Error: ", error.response?.data || error.message);
    throw error;
  }
};
