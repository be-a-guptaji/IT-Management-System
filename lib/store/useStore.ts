// @/lib/store/useStore.ts

// Zustand
import { create } from "zustand";

// Types
import { UserStore } from "@/lib/types";

// Create Zustand store
export const useUserStore = create<UserStore>((set) => ({
  name: "",
  completeUser: null,
  setName: (name) => set({ name }),
  setCompleteUser: (user) => set({ completeUser: user }),
  resetName: () => set({ name: "" }),
  resetCompleteUser: () => set({ completeUser: null }),
}));
