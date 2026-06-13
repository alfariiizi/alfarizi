"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
      <Toaster
        toastOptions={{
          className: "bg-secondary text-secondary-foreground",
        }}
      />
    </ThemeProvider>
  );
}
