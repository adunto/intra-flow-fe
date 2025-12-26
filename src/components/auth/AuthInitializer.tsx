"use client";

import apiClient from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

/** 앱이 브라우저에서 처음 실행될 때(새로고침 등) 토큰을 재발급받는 클라이언트 컴포넌트 */
export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAccessToken, setUser } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await apiClient.post("/auth/refresh");

        // 성공시
        setAccessToken(data.accessToken);
        if (data.user) setUser(data.user);
      } catch (err) {
        console.log("인증 토큰 부재", err);
      } finally {
        setIsInitialized(true);
      }
    };
    initializeAuth();
  }, [setAccessToken, setUser]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
