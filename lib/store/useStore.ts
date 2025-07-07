// @/lib/store/useStore.ts

// Zustand
import { create } from "zustand";

// Types
import { UserStore } from "@/lib/types";

// Create Zustand store
export const useUserStore = create<UserStore>((set) => ({
  name: "",
  setName: (name) => set({ name }),
  resetName: () => set({ name: "" }),
}));
