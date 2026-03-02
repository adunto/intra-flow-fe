import { create } from "zustand";

export type TabEnum = "BOARD" | "MESSENGER";

interface TabStore {
  tab: TabEnum;
  setTab: (tab: TabEnum) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  tab: "BOARD",
  setTab: (tab) => set({ tab: tab }),
}));
