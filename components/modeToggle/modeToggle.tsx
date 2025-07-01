// components/modeToggle/modeToggle.tsx

"use client";

// Hooks
import * as React from "react";
import { useTheme } from "next-themes";

// Components
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Switch
        className="h-6 w-12 scale-125 cursor-pointer"
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </>
  );
}
