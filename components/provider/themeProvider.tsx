// @components/provider/themeProvider.tsx

"use client";

// Hooks
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/// This component wraps the NextThemesProvider and allows you to pass in children and theme to the whole application
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
