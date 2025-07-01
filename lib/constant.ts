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

// Navigation items for the User sidebar
export const AdminNavigationItems = [
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
  },
  {
    title: "Add IT Personal",
    url: "/admin/add-it-personal",
    icon: UserPlus,
  },
  {
    title: "Manage PCs",
    url: "/admin/manage-pcs",
    icon: Edit,
  },
  {
    title: "Pending Complaints",
    url: "/admin/pending-complaint",
    icon: CloudLightning,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

// Home Navigation Item
export const HomeNavigationItem = [
  { title: "All PCs", icon: Laptop },
  { title: "Manage User", icon: UserPlus },
  { title: "Add IT Personal", icon: PlusSquare },
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
