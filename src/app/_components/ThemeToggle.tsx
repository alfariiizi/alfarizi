"use client";

import "@theme-toggles/react/css/Classic.css";

import { Classic } from "@theme-toggles/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Classic
      duration={750}
      reversed
      placeholder="Toggle"
      toggled={theme === "dark"}
      toggle={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="h-full w-full"
    />
  );
}
