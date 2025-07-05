// @lib/constant.ts

// Icons
import { Edit, Home, Settings, UserPlus } from "lucide-react";

// Navigation items for the sidebar
export const NavigationItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Add User",
    url: "/add-user",
    icon: UserPlus,
  },
  {
    title: "Manage User",
    url: "/manage-user",
    icon: Edit,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
