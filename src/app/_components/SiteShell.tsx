"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import { layout } from "./shared";

type Props = {
  children: React.ReactNode;
};

export function SiteShell({ children }: Props) {
  const pathname = usePathname();
  const hideChrome =
    pathname?.startsWith("/resume/ats") || pathname?.startsWith("/resume/ori");

  return (
    <div className="flex min-h-lvh flex-col">
      {!hideChrome ? <Navbar /> : null}
      <main
        className="relative flex-grow"
        style={{
          paddingTop: layout.paddingTop,
          paddingBottom: layout.paddingBottom,
        }}
      >
        {children}
      </main>
      {!hideChrome ? <Footer /> : null}
    </div>
  );
}

