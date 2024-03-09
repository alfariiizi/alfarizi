import Link from "next/link";
import { menus } from "./shared";

export default function LargerNavbar() {
  const home = menus[0];
  const others = menus.slice(1);
  return (
    <>
      <Link
        href={home.href}
        className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-background duration-150 hover:opacity-80"
      >
        <home.icon />
        {home.label}
      </Link>
      {others.map((menu) => (
        <Link
          key={menu.label}
          href={menu.href}
          className="w-fit text-nowrap duration-150 hover:opacity-80"
        >
          {menu.label}
        </Link>
      ))}
    </>
  );
}
