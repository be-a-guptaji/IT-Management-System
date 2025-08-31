// @/components/header/index.tsx

"use client";

// Components
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Icons
import { LogOut } from "lucide-react";

// Utility
import Link from "next/link";
import { useRouter } from "next/navigation";

// Store
import { useUserStore } from "@/lib/store/useStore";

// POST Services
import { logoutUser } from "@/services/POST";

export const Header = () => {
  // Router
  const router = useRouter();

  // Store
  const { resetName } = useUserStore();

  // Function to handle logout
  const logOut = async () => {
    try {
      // Make a request to log out
      const res = await logoutUser();

      // Reset the name in the store if logged out successfully
      if (res.status === 200) {
        resetName();
      }

      // If logged out, redirect to login
      if (res.status === 200) {
        router.push("/");
      }
    } catch {
      // Handle error silently
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-[#1c1917]">
        <header className="z-10 flex h-14 w-full items-center justify-between px-4 shadow-md backdrop-blur-sm dark:bg-[#1c1917]">
          <div className="flex items-center justify-center gap-6">
            <SidebarTrigger className="cursor-pointer" />
            <Link
              href="/home"
              className="cursor-default text-xl font-semibold tracking-wide"
            >
              ADRDE
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={logOut}
              className="flex cursor-pointer items-center gap-2 bg-red-500 hover:scale-105 hover:bg-red-600 active:scale-95"
            >
              <span className="flex items-center gap-1 font-semibold">
                Logout <LogOut />
              </span>
            </Button>
          </div>
        </header>

        <Separator className="z-10 h-1 dark:bg-white/50" />
      </div>
    </>
  );
};
