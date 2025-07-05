// @components/navigation/index.tsx

"use client";

// Icon
import { Shield } from "lucide-react";

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// Utility
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Constants
import { NavigationItems } from "@/lib/constant";

export function NavigationSidebar() {
  // Get the current pathname
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="my-6 cursor-default">
        <div className="flex items-center justify-center gap-4">
          <Shield className="size-12 rounded-md bg-blue-500 fill-blue-500 stroke-1 p-2" />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-3xl font-semibold tracking-widest">ADRDE</h1>
            <p className="font-medium">IT Management</p>
          </div>
        </div>
      </SidebarHeader>
      <Separator className="mb-4 w-full" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              {NavigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="h-14">
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-full",
                      pathname.includes(item.url) &&
                        "bg-blue-500 hover:bg-blue-500 active:bg-blue-500"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="!size-6" />
                      <span className="ml-2 text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="cursor-default">
        <div className="flex h-16 items-center justify-start gap-4 rounded-md border bg-black/5 px-4 dark:bg-zinc-800/50">
          <p className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-semibold text-white">
            A
          </p>
          <p className="font-medium">Aryan</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
