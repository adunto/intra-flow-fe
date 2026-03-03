"use client";

import { useEffect } from "react";
import { refreshAccessToken } from "@/dal/auth";
import { getUserInfo } from "@/dal/user";
import { useAuthStore } from "@/stores/useAuthStore";

// 전체 앱 초기화 플래그
let isAppInitialized = false;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAccessToken, setUser, setAuthInitialized } = useAuthStore();

  useEffect(() => {
    if (isAppInitialized) {
      setAuthInitialized(true);
      return;
    }

    const initAuth = async () => {
      isAppInitialized = true;
      try {
        await refreshAccessToken();
        const user = await getUserInfo();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setAuthInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setUser, setAuthInitialized]);

  return <>{children}</>;
};
