"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState } from "react";
import { navbar } from "../shared";
import { menus } from "./shared";

export default function MobileNavbar() {
  const [isOpen, setOpen] = useState(false);
  // const ref = useRef(null);
  // useClickAway(ref, () => setOpen(false));

  return (
    <div className="relative lg:hidden">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} duration={0.2} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0.6, y: "-100dvh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.6, y: "-100dvh" }}
            transition={{ duration: 0.2 }}
            style={{
              top: navbar.height,
              // height: menus.length * 105,
              height: `calc(100dvh - ${navbar.height})`,
              zIndex: "90",
            }}
            className="fixed left-0 w-full bg-background px-10 py-8 shadow-2xl backdrop-blur-md"
          >
            <ul className="flex w-full flex-col gap-6">
              {menus.map((menu) => (
                <Link
                  key={menu.label}
                  href={menu.href}
                  className="w-full py-2 duration-150 hover:opacity-70"
                  onClick={() => setOpen(false)}
                >
                  <li className="inline-flex w-fit items-center gap-3">
                    <menu.icon /> {menu.label}
                  </li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
