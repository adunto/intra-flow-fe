import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthStore {
  accessToken: string | null;
  user: User | null;
  isAuthInitialized: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setAuthInitialized: (isInitialized: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  isAuthInitialized: false,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setAuthInitialized: (val) => set({ isAuthInitialized: val }),
}));
