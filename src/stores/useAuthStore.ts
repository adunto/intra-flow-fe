import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "@/types/user";

interface AuthStore {
  accessToken: string | null;
  user: User | null;
  isAuthInitialized: boolean;
  updatedAt: number | null;

  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setAuthInitialized: (isInitialized: boolean) => void;
}

const EXPIRE_TIME = 2 * 60 * 60 * 1000; // 2시간

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthInitialized: false,
      updatedAt: null,

      setAccessToken: (token) =>
        set({ accessToken: token, updatedAt: Date.now() }),
      setUser: (user) => set({ user, updatedAt: Date.now() }),
      setAuthInitialized: (val) => set({ isAuthInitialized: val }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.updatedAt && Date.now() - state.updatedAt > EXPIRE_TIME) {
          state.setAccessToken(null);
          state.setUser(null);
        }
      },
    },
  ),
);
