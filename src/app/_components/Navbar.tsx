import { cn } from "@/lib/utils";
import Link from "next/link";
import { Maxwidthdiv } from "./Maxwindthdiv";
import { displayFont } from "./fonts";
import { navbar } from "./shared";

const menus = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Article",
    href: "/blog",
  },
  {
    label: "Project",
    href: "/project",
  },
  //   {
  //     label: "Contact Me",
  //     href: "/contact",
  //   },
] as const;

export function Navbar() {
  return (
    <Maxwidthdiv
      className="bg-background/60 sticky inset-x-0 top-0 z-[100] flex items-center justify-between backdrop-blur-md"
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
      <div className={cn(displayFont.className, "flex items-center gap-10")}>
        {menus.map((menu) => (
          <Link
            key={menu.label}
            href="/"
            className="duration-150 hover:opacity-80"
          >
            {menu.label}
          </Link>
        ))}
      </div>
    </Maxwidthdiv>
  );
}
