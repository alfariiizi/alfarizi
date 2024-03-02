"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { navbar } from "../shared";
import { menus } from "./shared";

export default function MobileNavbar() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative lg:hidden">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} duration={0.2} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              top: navbar.height,
              height: menus.length * 105,
            }}
            className="fixed left-0 z-[100] w-full border-b-2 border-text bg-background px-10 py-8 shadow-2xl backdrop-blur-md"
          >
            <ul className="flex w-full flex-col gap-10">
              {menus.map((menu, index) => (
                <Link
                  key={menu.label}
                  href={menu.href}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <motion.li
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.1,
                      type: "tween",
                      delay: 0.05 + index / 20,
                    }}
                    className="w-full rounded-lg border-2 border-text px-4 py-3 text-lg duration-150 hover:opacity-70"
                  >
                    {menu.label}
                  </motion.li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
