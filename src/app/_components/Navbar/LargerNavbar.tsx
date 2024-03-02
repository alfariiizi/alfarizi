import Link from "next/link";
import { menus } from "./shared";

export default function LargerNavbar() {
  return menus.map((menu) => (
    <Link
      key={menu.label}
      href={menu.href}
      className="duration-150 hover:opacity-80"
    >
      {menu.label}
    </Link>
  ));
}
