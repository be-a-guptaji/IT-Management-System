// @hooks/usePreference.ts

// Hooks
import { create } from "zustand";

// Types
import { User, USER_ROLES, UserRole } from "@/lib/types";

// Zustand store for user preferences for the application
export const usePreference = create<User>()((set, get) => ({
  id: "", // Default user ID
  role: USER_ROLES.USER, // Default user role
  setUser: (user: User) => set({ ...get(), ...user }), // Set user with provided user object
  setRole: (role: UserRole) => set({ ...get(), role }), // Set user role with provided role
  getRole: () => get().role, // Get current user role
  clearAll: () => set({ id: "", role: USER_ROLES.USER }), // Clear all user preferences by resetting to default values
}));
