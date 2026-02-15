"use client";

import { refreshAccessToken } from "@/dal/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!accessToken) {
          await refreshAccessToken();
        } else {
          setAccessToken(accessToken);
        }
      } catch (error) {
        setAccessToken(null);
      }
    };

    initAuth();
  }, [setAccessToken]);

  return <>{children}</>;
};
