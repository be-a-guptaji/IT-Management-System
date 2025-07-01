// @lib/constant.ts

// Icons
import {
  CloudLightning,
  Edit,
  Home,
  Laptop,
  PlusSquare,
  Settings,
  UserPlus,
} from "lucide-react";

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
    title: "Manage Devices",
    url: "/manage-devices",
    icon: Edit,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

// const chooseColor = (status) => {
//   switch (status) {
//     case "pending":
//       return "bg-purple-200 text-purple-600";
//     case "dispatched":
//       return "bg-yellow-200 text-yellow-600";
//     case "delivered":
//       return "bg-green-200 text-green-600";
//     case "cancelled":
//       return "bg-red-200 text-red-600";
//     default:
//       return "bg-purple-200 text-purple-600";
//   }
// };
