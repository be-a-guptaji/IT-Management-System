// @lib/types.ts

// Runtime object for roles
export const USER_ROLES = {
  IT_ADMIN: "IT Admin",
  USER: "User",
  SUPER_ADMIN: "SuperAdmin",
} as const;

// Type from object values
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Type for the zustand
export type User = {
  id: string;
  role: UserRole;
};
