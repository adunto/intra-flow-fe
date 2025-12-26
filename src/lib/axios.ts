import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 재시도하지 않은 요청이라면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지 플래그

      try {
        // Refresh Token(쿠키)으로 새 Access Token 요청
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true } // 쿠키 포함 필수
        );

        // Zustand Store 업데이트
        useAuthStore.getState().setAccessToken(data.accessToken);

        // 실패했던 요청의 헤더를 새 토큰으로 업데이트 후 재요청
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Refresh Token도 만료되었거나 유효하지 않음 -> 완전 로그아웃
        useAuthStore.getState().logout();
        
        // 로그인 페이지로 리다이렉트 (window 객체 사용 주의: 클라이언트 환경 체크)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;