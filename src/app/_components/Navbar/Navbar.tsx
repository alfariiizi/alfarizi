import { cn } from "@/lib/utils";
import Link from "next/link";
import { Maxwidthdiv } from "../Maxwindthdiv";
import { ThemeToggle } from "../ThemeToggle";
import { navbar } from "../shared";
import LargerNavbar from "./LargerNavbar";
import MobileNavbar from "./MobileNavbar";

export function Navbar() {
  return (
    <nav className="bg-background/90 sticky inset-x-0 top-0 z-[100] backdrop-blur-md">
      <Maxwidthdiv
        className="flex items-center justify-between"
        style={{
          height: navbar.height,
        }}
      >
        <Link href="/">
          <h1
            className={cn(
              "font-display",
              "text-xl font-semibold duration-150 hover:opacity-80",
            )}
          >
            alfarizi.
          </h1>
        </Link>
        <div
          className={cn("font-display", "flex items-center gap-4 md:gap-10")}
        >
          <ThemeToggle />
          {/* For larger screen */}
          <div className="hidden items-center gap-4 md:flex md:gap-10">
            <LargerNavbar />
          </div>
          {/* For mobile screen */}
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </Maxwidthdiv>
    </nav>
  );
}
