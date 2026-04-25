"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ThemeToaster() {
  const { theme, systemTheme } = useTheme();

  // resolve actual theme
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  return (
    <Toaster
      position="top-center"
      richColors
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
