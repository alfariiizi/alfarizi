"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function CounterDemo2() {
  const [count, setCount] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const factor = isIncreasing ? -1 : 1;

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-3">
      <AnimatePresence>
        <motion.div
          key={count}
          initial={{
            opacity: 0,
            translateX: 50 * factor,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
          }}
          exit={{
            opacity: 0,
            translateY: -30,
          }}
          className="absolute top-0"
        >
          {count}
        </motion.div>
      </AnimatePresence>
      <div className="mt-10 flex gap-3">
        <button
          onClick={() => {
            setCount((prev) => prev + 1);
            setIsIncreasing(true);
          }}
          className="rounded-md bg-primary px-2 py-1 text-sm text-background duration-150 hover:opacity-70 sm:text-base"
        >
          Increase
        </button>
        <button
          onClick={() => {
            setCount((prev) => prev - 1);
            setIsIncreasing(false);
          }}
          className="rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground duration-150 hover:opacity-70 sm:text-base"
        >
          Decrease
        </button>
      </div>
    </div>
  );
}
