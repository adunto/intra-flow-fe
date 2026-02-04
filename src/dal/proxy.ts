import { refreshAccessToken } from "@/api/authService";
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
  if (token) {
    // Request 에 토큰 넣기 ( 있는 경우에만 )
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface OriginalRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as OriginalRequest;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return client(originalRequest);
      } catch (error) {
        useAuthStore.getState().setAccessToken(null);
        return Promise.reject(error);
      }
    }
  },
);

export const apiProxy = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await client.request<T>(config);

    return response.data;
  } catch (error: any) {
    console.error("API Proxy Error: ", error.response?.data || error.message);
    throw error;
  }
};
