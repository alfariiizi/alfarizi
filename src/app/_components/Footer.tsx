import Link from "next/link";
import React from "react";
import { menus } from "./Navbar/shared";
import { Maxwidthdiv } from "./Maxwindthdiv";

export default function Footer() {
  const footerMenu = menus.slice(1);

  return (
    <footer className="w-full shrink-0 border-t">
      <Maxwidthdiv className="flex w-full flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Alfarizi. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          {footerMenu.map((menu) => (
            <Link
              key={`footer-menu-${menu.label}`}
              href={menu.href}
              className="text-xs underline-offset-4 duration-150 hover:underline hover:opacity-80 lg:hover:no-underline"
              prefetch={false}
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </Maxwidthdiv>
    </footer>
  );
}
