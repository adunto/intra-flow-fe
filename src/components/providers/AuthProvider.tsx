"use client";

import { refreshAccessToken } from "@/api/authService";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken, isInitialized, setInitialized } =
    useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!accessToken) {
          await refreshAccessToken();
        }
      } catch (error) {
        setAccessToken(null);
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken]);

  if (!isInitialized) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <span className="text-2xl font-bold">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
};
