import { cn } from "@/lib/utils";
import Link from "next/link";
import { Maxwidthdiv } from "./Maxwindthdiv";
import { ThemeToggle } from "./ThemeToggle";
import { displayFont } from "./fonts";
import { navbar } from "./shared";

const menus = [
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Project",
    href: "/project",
  },
  {
    label: "Tags",
    href: "/tag",
  },
  //   {
  //     label: "Contact Me",
  //     href: "/contact",
  //   },
] as const;

export function Navbar() {
  return (
    <nav className="bg-background/60 sticky inset-x-0 top-0 z-[100] backdrop-blur-md">
      <Maxwidthdiv
        className="flex items-center justify-between"
        style={{
          height: navbar.height,
        }}
      >
        <Link href="/">
          <h1
            className={cn(
              displayFont.className,
              "text-xl font-semibold duration-150 hover:opacity-80",
            )}
          >
            alfarizi.
          </h1>
        </Link>
        <div
          className={cn(
            displayFont.className,
            "flex items-center gap-4 md:gap-10",
          )}
        >
          <ThemeToggle />
          {menus.map((menu) => (
            <Link
              key={menu.label}
              href={menu.href}
              className="duration-150 hover:opacity-80"
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </Maxwidthdiv>
    </nav>
  );
}
