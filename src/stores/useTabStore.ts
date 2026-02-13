import { create } from "zustand";

export type TabEnum = "BOARD" | "MESSENGER";

interface TabState {
  tab: TabEnum;
  setTab: (tab: TabEnum) => void;
}

export const useTabStore = create<TabState>((set) => ({
  tab: "BOARD",
  setTab: (tab) => set({ tab: tab }),
}));
