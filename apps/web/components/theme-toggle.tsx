"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10"
    >
      <Sun
        className="absolute transition-all duration-300 ease-in-out h-5 w-5 
        rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Moon
        className="absolute transition-all duration-300 ease-in-out h-5 w-5 
        rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </Button>
  );
}
