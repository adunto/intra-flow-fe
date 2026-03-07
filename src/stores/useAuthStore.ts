import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { UserSummary } from "@/types/user";

interface AuthStore {
  accessToken: string | null;
  user: UserSummary | null;
  updatedAt: number | null;
  isPending: boolean;
  isAuthInitialized: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: UserSummary | null) => void;
  setIsPending: (isPending: boolean) => void;
  setIsAuthInitialized: (isInitialized: boolean) => void;
}

const EXPIRE_TIME = 2 * 60 * 60 * 1000; // 2시간

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      updatedAt: null,
      isPending: false,
      isAuthInitialized: false,

      setAccessToken: (token) =>
        set({ accessToken: token, updatedAt: Date.now() }),
      setUser: (user) => set({ user, updatedAt: Date.now() }),
      setIsPending: (isPending) => set({isPending: isPending}),
      setIsAuthInitialized: (isInitialized) =>
        set({ isAuthInitialized: isInitialized }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.updatedAt && Date.now() - state.updatedAt > EXPIRE_TIME) {
          state.setAccessToken(null);
          state.setUser(null);
        }

        state?.setIsAuthInitialized(true);
      },
    },
  ),
);
