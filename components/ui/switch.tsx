"use client";

// Components
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

// Icons
import { Moon, Sun } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const { theme } = useTheme();
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Sun
        className={cn(
          "left-1 size-[15px] text-black",
          theme === "dark" ? "relative" : "hidden"
        )}
      />
      <Moon
        className={cn(
          "left-7 size-[15px] text-black",
          theme === "light" ? "relative" : "hidden"
        )}
      />
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          theme === "dark" ? "translate-x-3" : "-translate-x-3"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
