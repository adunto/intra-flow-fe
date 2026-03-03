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
    const { accessToken, user } = useAuthStore.getState();

    if (isAppInitialized || (accessToken && user)) {
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
      } catch {
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
