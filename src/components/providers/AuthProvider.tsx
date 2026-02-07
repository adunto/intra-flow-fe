"use client";

import { refreshAccessToken } from "@/dal/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } =
    useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!accessToken) {
          await refreshAccessToken();
        }
      } catch (error) {
        setAccessToken(null);
        console.error("토큰 재발급 실패", error);
      }
    };

    initAuth();
  }, [setAccessToken]);

  return <>{children}</>;
};
