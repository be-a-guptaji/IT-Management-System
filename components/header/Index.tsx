// @components/header/index.tsx

// Components
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Icons
import { LogOut } from "lucide-react";

const Index = () => {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-[#1c1917]">
        <header className="z-10 flex h-14 w-full items-center justify-between px-4 shadow-md backdrop-blur-sm dark:bg-[#1c1917]">
          <div className="flex items-center justify-center gap-6">
            <SidebarTrigger className="cursor-pointer" />
            <h2 className="text-xl font-semibold tracking-wide">ADRDE</h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button className="flex cursor-pointer items-center gap-2 bg-red-500 hover:scale-105 hover:bg-red-600 active:scale-95">
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

export default Index;
